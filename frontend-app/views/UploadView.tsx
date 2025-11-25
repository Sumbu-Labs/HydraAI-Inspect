import React, { useState, useRef } from 'react';
import { Camera, Upload, X, CheckCircle2, Image as ImageIcon, Plus } from 'lucide-react';
import { Button, GlassCard, ProgressBar, BottomDrawer } from '../components/UI';
import { AppView, VehicleInfo, DEFAULT_VEHICLE } from '../types';

interface UploadViewProps {
  onNext: (data: { info: VehicleInfo, images: File[] }) => void;
  isAnalyzing?: boolean;
}

export const UploadView: React.FC<UploadViewProps> = ({ onNext, isAnalyzing = false }) => {
  const [info, setInfo] = useState<VehicleInfo>(DEFAULT_VEHICLE);
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFiles = Array.from(event.target.files);
      const newPreviews = newFiles.map(file => URL.createObjectURL(file as Blob));

      setImages([...images, ...newFiles]);
      setPreviews([...previews, ...newPreviews]);
      setIsDrawerOpen(false);
    }
  };

  const handleAddImage = (source: 'camera' | 'gallery') => {
    if (fileInputRef.current) {
      // For now, both trigger file input. In a real mobile app, 'camera' would trigger camera API
      fileInputRef.current.click();
    }
  };

  const handleNext = () => {
    if (step === 1) setStep(2);
    else onNext({ info, images });
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...previews];

    URL.revokeObjectURL(newPreviews[index]); // Cleanup

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setImages(newImages);
    setPreviews(newPreviews);
  };

  const MAX_PHOTOS = 6;
  const MIN_PHOTOS = 3;

  return (
    <div className="max-w-2xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500 pb-40">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-display font-bold">New Inspection</h2>
          <p className="text-gray-400 text-sm">Step {step} of 2</p>
        </div>
        <div className="w-32">
          <ProgressBar progress={step === 1 ? 50 : 100} />
        </div>
      </div>

      {step === 1 ? (
        /* Step 1: Vehicle Information */
        <GlassCard className="p-8 space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cardano to-cyan flex items-center justify-center text-white font-bold shadow-lg shadow-cyan/20 text-sm">1</div>
            <h3 className="text-xl font-display font-bold text-white">Vehicle Identity</h3>
          </div>

          <div className="space-y-6">
            <div className="relative group">
              <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider group-focus-within:text-cyan transition-colors">Vehicle Model</label>
              <input
                type="text"
                value={info.label}
                onChange={(e) => setInfo({ ...info, label: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white text-lg placeholder-gray-600 focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 focus:bg-white/10 focus:outline-none transition-all"
                placeholder="e.g. 2021 Tesla Model 3"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative group">
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider group-focus-within:text-cyan transition-colors">License Plate</label>
                <input
                  type="text"
                  value={info.plate}
                  onChange={(e) => setInfo({ ...info, plate: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-mono text-base focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 focus:bg-white/10 focus:outline-none transition-all"
                  placeholder="e.g. AB-1234-CD"
                />
              </div>
              <div className="relative group">
                <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wider group-focus-within:text-cyan transition-colors">VIN Number</label>
                <input
                  type="text"
                  value={info.vin}
                  onChange={(e) => setInfo({ ...info, vin: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white font-mono text-base focus:border-cyan/50 focus:ring-1 focus:ring-cyan/50 focus:bg-white/10 focus:outline-none transition-all"
                  placeholder="e.g. 1HGCM..."
                />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Button
              onClick={handleNext}
              className="w-full py-4 text-lg shadow-[0_0_30px_rgba(0,51,173,0.3)] hover:shadow-[0_0_50px_rgba(70,240,255,0.4)] transition-all hover:-translate-y-0.5"
            >
              Confirm Details
            </Button>
            <p className="text-center text-xs text-gray-500 mt-6 font-medium">
              You can change these details later.
            </p>
          </div>
        </GlassCard>
      ) : (
        /* Step 2: Photo Upload (Redesigned) */
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
          <div>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-full bg-cardano text-xs flex items-center justify-center">2</span>
              Capture Damage
            </h3>
            <p className="text-gray-400 text-sm ml-8">Upload clear photos of the vehicle damages.</p>
          </div>

          {/* Photo Slots Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: MAX_PHOTOS }).map((_, index) => {
              const hasImage = index < previews.length;
              const isNext = index === previews.length;

              if (hasImage) {
                return (
                  <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 group shadow-lg">
                    <img src={previews[index]} alt={`Evidence ${index + 1}`} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full text-white hover:bg-red-500/80 transition-colors backdrop-blur-md"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded-md text-[10px] font-mono backdrop-blur-md text-white border border-white/10">
                      IMG_00{index + 1}
                    </div>
                  </div>
                );
              }

              if (isNext) {
                return (
                  <button
                    key={index}
                    onClick={() => setIsDrawerOpen(true)}
                    className="aspect-square rounded-2xl border-2 border-dashed border-cyan/30 bg-cyan/5 flex flex-col items-center justify-center gap-3 hover:bg-cyan/10 hover:border-cyan hover:shadow-[0_0_20px_rgba(70,240,255,0.1)] transition-all group relative overflow-hidden"
                  >
                    <div className="p-3 bg-cyan/10 rounded-full group-hover:scale-110 transition-transform border border-cyan/20">
                      <Camera className="w-6 h-6 text-cyan" />
                    </div>
                    <span className="text-xs font-bold text-cyan uppercase tracking-wider">Add Photo</span>
                  </button>
                );
              }

              // Empty Future Slot
              return (
                <div key={index} className="aspect-square rounded-2xl border border-white/5 bg-white/5 flex items-center justify-center opacity-50">
                  <div className="w-2 h-2 rounded-full bg-white/10" />
                </div>
              );
            })}
          </div>

          {/* Requirements Indicator */}
          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${images.length >= MIN_PHOTOS ? 'bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.5)]' : 'bg-orange-400 animate-pulse'}`} />
              <span className={`text-sm font-medium ${images.length >= MIN_PHOTOS ? 'text-white' : 'text-gray-300'}`}>
                {images.length >= MIN_PHOTOS ? 'Minimum met' : 'Minimum 3 photos required'}
              </span>
            </div>
            <span className="text-xs font-mono text-gray-500">{images.length}/{MAX_PHOTOS}</span>
          </div>

          {/* Action Buttons - Static Position for Scroll Safety */}
          <div className="pt-8 flex gap-4">
            <Button variant="secondary" className="flex-1" onClick={() => setStep(1)}>
              Back
            </Button>
            <Button
              className="flex-[2] shadow-[0_0_30px_rgba(0,51,173,0.4)]"
              disabled={images.length < MIN_PHOTOS || isAnalyzing}
              onClick={handleNext}
            >
              {isAnalyzing ? 'Uploading...' : (images.length >= MIN_PHOTOS ? 'Start Analysis' : 'Upload More')}
            </Button>
          </div>
        </div>
      )}

      {/* Image Source Drawer */}
      <BottomDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} title="Add Vehicle Photos">
        <button
          onClick={() => handleAddImage('camera')}
          className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan/30 hover:shadow-[0_0_20px_rgba(70,240,255,0.1)] transition-all group text-left active:scale-[0.98]"
        >
          <div className="p-3 rounded-full bg-gradient-to-br from-cardano to-blue-600 text-white shadow-lg">
            <Camera className="w-6 h-6" />
          </div>
          <div>
            <span className="block font-bold text-white text-lg group-hover:text-cyan transition-colors">Take Photo</span>
            <span className="text-xs text-gray-400">Use camera to capture damage</span>
          </div>
        </button>

        <button
          onClick={() => handleAddImage('gallery')}
          className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan/30 transition-all group text-left active:scale-[0.98]"
        >
          <div className="p-3 rounded-full bg-white/10 text-cyan border border-cyan/20 group-hover:bg-cyan/20 transition-colors">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <span className="block font-bold text-white text-lg group-hover:text-cyan transition-colors">Upload from Gallery</span>
            <span className="text-xs text-gray-400">Select existing photos</span>
          </div>
        </button>

        <button
          onClick={() => setIsDrawerOpen(false)}
          className="w-full p-4 rounded-2xl text-center font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors mt-2"
        >
          Cancel
        </button>
      </BottomDrawer>
    </div>
  );
};