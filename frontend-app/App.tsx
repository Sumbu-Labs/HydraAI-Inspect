import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Layout } from './components/Layout';
import { Button, Modal } from './components/UI';
import { OnboardingView } from './views/OnboardingView';
import { UploadView } from './views/UploadView';
import { AnalysisView } from './views/AnalysisView';
import { ResultView } from './views/ResultView';
import { TokenView } from './views/TokenView';
import { HistoryViewComponent as HistoryView } from './views/HistoryView';
import { SettingsView } from './views/SettingsView';
import { InspectionDetailView } from './views/InspectionDetailView';
import { LoadingView } from './views/LoadingView';
import { AppView, InspectionRecord, Damage, DamageSeverity, VehicleInfo, DamageType } from './types';
import { inspectionApi, Inspection } from './services/inspections';
import { useToast } from './components/Toast';

// Inner App Component to use the hook
const HydraInspectApp = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.ONBOARDING);
  const [activeInspectionId, setActiveInspectionId] = useState<string | null>(null);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<string | null>(null);
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  // Queries
  const { data: historyData, refetch: refetchHistory } = useQuery({
    queryKey: ['inspections'],
    queryFn: () => inspectionApi.list(),
  });

  const { data: activeInspectionData, refetch: refetchActive, isLoading: isActiveLoading, error: activeError } = useQuery({
    queryKey: ['inspection', activeInspectionId],
    queryFn: () => activeInspectionId ? inspectionApi.get(activeInspectionId) : null,
    enabled: !!activeInspectionId,
    refetchInterval: (query) => {
      const status = query.state.data?.status;
      // Poll if status is PENDING_AI or PENDING_UPLOAD (though upload is usually fast)
      return (status === 'PENDING_AI' || status === 'PENDING_UPLOAD') ? 2000 : false;
    },
  });



  // Mutations
  const createInspectionMutation = useMutation({
    mutationFn: inspectionApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inspections'] });
    },
  });

  const uploadImagesMutation = useMutation({
    mutationFn: (variables: { id: string; files: File[] }) =>
      inspectionApi.uploadImages(variables.id, variables.files),
  });

  const analyzeInspectionMutation = useMutation({
    mutationFn: inspectionApi.analyze,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inspections'] });
      queryClient.invalidateQueries({ queryKey: ['inspection'] });
    },
  });

  const mintInspectionMutation = useMutation({
    mutationFn: inspectionApi.mint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inspections'] });
      queryClient.invalidateQueries({ queryKey: ['inspection'] });
    },
  });

  const deleteInspectionMutation = useMutation({
    mutationFn: inspectionApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inspections'] });
      showToast('Inspection deleted successfully', 'success');
    },
    onError: (error) => {
      console.error('Delete failed:', error);
      showToast('Failed to delete inspection', 'error');
    }
  });

  // Derived State
  const history = historyData?.inspections.map(mapApiToRecord) || [];
  const activeInspection = activeInspectionData ? mapApiToRecord(activeInspectionData) : null;

  // Watch for status changes to auto-advance views
  useEffect(() => {
    if (activeInspection?.status === 'Analyzed' && currentView === AppView.ANALYSIS) {
      setCurrentView(AppView.RESULT);
    }
  }, [activeInspection?.status, currentView]);

  // Flow Handlers
  const startInspection = () => {
    setCurrentView(AppView.UPLOAD);
  };

  const handleUploadComplete = async (data: { info: VehicleInfo, images: File[] }) => {
    try {
      // 1. Create Inspection
      const inspection = await createInspectionMutation.mutateAsync({
        plate: data.info.plate,
        vin: data.info.vin,
        vehicleLabel: data.info.label,
      });

      setActiveInspectionId(inspection.id);

      // 2. Upload Images
      await uploadImagesMutation.mutateAsync({
        id: inspection.id,
        files: data.images,
      });

      // 3. Trigger Analysis
      await analyzeInspectionMutation.mutateAsync(inspection.id);

      // 4. Go to Analysis View
      setCurrentView(AppView.ANALYSIS);
    } catch (error) {
      console.error('Failed to start inspection:', error);
      showToast('Failed to start inspection. Please try again.', 'error');
      // Handle error (show toast, etc.)
    }
  };

  const handleAnalysisComplete = () => {
    // This is now handled by the useEffect watching status
    // But we can keep it as a manual trigger if needed
    refetchActive();
  };

  const handleMintToken = async () => {
    if (!activeInspectionId) return;

    try {
      await mintInspectionMutation.mutateAsync(activeInspectionId);
      // Refresh data to get new status and txHash
      await refetchActive();
      setCurrentView(AppView.TOKEN);
      showToast('Certificate minted successfully on Hydra L2!', 'success');
    } catch (error) {
      console.error('Minting failed:', error);
      showToast('Failed to mint certificate. Please try again.', 'error');
      // Handle error
    }
  };

  const handleDeleteInspection = (id?: string) => {
    const targetId = id || activeInspectionId;
    if (targetId) {
      setDeleteConfirmationId(targetId);
    }
  };

  const confirmDelete = async () => {
    if (!deleteConfirmationId) return;

    try {
      await deleteInspectionMutation.mutateAsync(deleteConfirmationId);

      if (deleteConfirmationId === activeInspectionId) {
        setActiveInspectionId(null);
        setCurrentView(AppView.HISTORY);
      }
      setDeleteConfirmationId(null);
    } catch (error) {
      // Error handled in mutation
    }
  };

  const handleReRunAnalysis = async () => {
    if (!activeInspectionId) return;
    try {
      await analyzeInspectionMutation.mutateAsync(activeInspectionId);
      setCurrentView(AppView.ANALYSIS);
    } catch (error) {
      console.error('Re-run failed:', error);
      showToast('Failed to re-run analysis.', 'error');
    }
  };

  // View Rendering Logic
  const renderView = () => {
    switch (currentView) {
      case AppView.ONBOARDING:
        return <OnboardingView onStart={startInspection} history={history} />;
      case AppView.UPLOAD:
        return (
          <UploadView
            onNext={handleUploadComplete}
            isAnalyzing={
              createInspectionMutation.isPending ||
              uploadImagesMutation.isPending ||
              analyzeInspectionMutation.isPending
            }
          />
        );
      case AppView.ANALYSIS:
        return <AnalysisView onComplete={handleAnalysisComplete} />;

      // ... (inside component)

      case AppView.RESULT:
        return activeInspection ? (
          <ResultView
            damages={activeInspection.damages}
            score={activeInspection.score}
            vehicle={activeInspection.vehicle}
            onMint={handleMintToken}
          />
        ) : <LoadingView />;
      case AppView.TOKEN:
        return activeInspection ? (
          <TokenView
            inspection={activeInspection}
            onBack={() => setCurrentView(AppView.ONBOARDING)}
          />
        ) : <LoadingView />;
      case AppView.HISTORY:
        return <HistoryView
          inspections={history}
          onSelect={(id) => {
            setActiveInspectionId(id);
            setCurrentView(AppView.INSPECTION_DETAILS);
          }}
          onDelete={handleDeleteInspection}
        />;
      case AppView.INSPECTION_DETAILS:
        console.log('INSPECTION_DETAILS View:', {
          activeInspectionId,
          isActiveLoading,
          hasData: !!activeInspectionData,
          activeInspection: !!activeInspection,
          error: activeError
        });

        if (activeError) {
          return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
              <p className="text-red-400 mb-4 text-lg">Failed to load inspection details</p>
              <p className="text-gray-400 text-sm mb-4">{String(activeError)}</p>
              <Button onClick={() => setCurrentView(AppView.HISTORY)}>Back to History</Button>
            </div>
          );
        }

        if (isActiveLoading) {
          return <LoadingView />;
        }

        if (!activeInspection && !isActiveLoading) {
          return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
              <p className="text-yellow-400 mb-4 text-lg">No inspection data found</p>
              <p className="text-gray-400 text-sm mb-4">ID: {activeInspectionId}</p>
              <Button onClick={() => setCurrentView(AppView.HISTORY)}>Back to History</Button>
            </div>
          );
        }

        return (
          <InspectionDetailView
            inspection={activeInspection!}
            onBack={() => setCurrentView(AppView.HISTORY)}
            onReRun={handleReRunAnalysis}
            onDelete={handleDeleteInspection}
          />
        );
      case AppView.SETTINGS:
        return <SettingsView />;
      default:
        return <OnboardingView onStart={startInspection} />;
    }
  };

  return (
    <Layout currentView={currentView} onChangeView={setCurrentView}>
      {renderView()}

      <Modal
        isOpen={!!deleteConfirmationId}
        onClose={() => setDeleteConfirmationId(null)}
        title="Delete Inspection"
        footer={
          <>
            <Button variant="ghost" onClick={() => setDeleteConfirmationId(null)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              className="bg-red-500 hover:bg-red-600 border-none shadow-none"
              onClick={confirmDelete}
              isLoading={deleteInspectionMutation.isPending}
            >
              Delete
            </Button>
          </>
        }
      >
        <p>Are you sure you want to delete this inspection? This action cannot be undone.</p>
      </Modal>
    </Layout>
  );
};

// Helper to map API response to UI types
function mapApiToRecord(apiData: Inspection): InspectionRecord {

  const damages = Array.isArray(apiData.damages) ? apiData.damages.map(d => ({
    id: d.id,
    type: d.clazz as DamageType,
    location: 'Detected Location',
    severity: d.severity as DamageSeverity,
    severityScore: Math.round(d.confidence * 100),
    confidence: Math.round(d.confidence * 100),
  })) : [];

  return {
    id: apiData.id,
    date: new Date(apiData.createdAt).toISOString().split('T')[0],
    vehicle: {
      label: apiData.vehicleLabel || 'Unknown Vehicle',
      plate: apiData.plate || 'Unknown Plate',
      vin: apiData.vin || 'Unknown VIN',
    },
    damages: damages,
    score: apiData.score || 0,
    status: mapStatus(apiData.status),
    imageUrl: (apiData.images && apiData.images.length > 0) ? apiData.images[0].url : 'https://picsum.photos/400/300',
    txHash: apiData.vctToken?.metadata?.txHash,
  };
}

function mapStatus(apiStatus: string): 'Pending' | 'Analyzed' | 'Minted' {
  switch (apiStatus) {
    case 'ANALYZED': return 'Analyzed';
    case 'MINTED': return 'Minted';
    default: return 'Pending';
  }
}

export default HydraInspectApp;
