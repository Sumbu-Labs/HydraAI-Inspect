import { useEffect } from 'react';
import { UploadForm } from '../components/UploadForm';
import { InspectionResult } from '../components/InspectionResult';
import { apiClient } from '../services/apiClient';
import { useInspectionStore } from '../store/inspectionStore';

export const Home = () => {
  const { inspections, setInspections } = useInspectionStore();

  useEffect(() => {
    apiClient
      .get('/inspections')
      .then((response) => setInspections(response.data ?? []))
      .catch(() =>
        setInspections([
          {
            id: 'demo-inspection',
            status: 'completed',
            score: 0.93,
            damageSummary: 'Minor scratches detected',
            metadataUrl: 'https://example.com/vct/demo'
          }
        ])
      );
  }, [setInspections]);

  return (
    <main className="layout">
      <section>
        <h1>HydraAI Inspect</h1>
        <p>Upload vehicle photos, review AI results, and mint Vehicle Condition Tokens.</p>
      </section>
      <UploadForm />
      <section>
        <h2>Recent Inspections</h2>
        {inspections.map((inspection) => (
          <InspectionResult key={inspection.id} {...inspection} />
        ))}
      </section>
    </main>
  );
};
