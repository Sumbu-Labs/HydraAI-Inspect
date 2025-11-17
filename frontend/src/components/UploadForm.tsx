import { FormEvent, useState } from 'react';
import { apiClient } from '../services/apiClient';
import { useInspectionStore } from '../store/inspectionStore';
import type { InspectionResultProps } from './InspectionResult';

export const UploadForm = () => {
  const { addInspection } = useInspectionStore();
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('artifact', file);
    formData.append('notes', notes);
    setIsSubmitting(true);
    try {
      await apiClient.post('/inspections', formData);
      const mockInspection: InspectionResultProps = {
        id: crypto.randomUUID(),
        status: 'processing'
      };
      addInspection(mockInspection);
      setFile(null);
      setNotes('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Upload Vehicle Photos</h2>
      <input type="file" onChange={(event) => setFile(event.target.files?.[0] ?? null)} />
      <textarea
        placeholder="Inspection notes"
        value={notes}
        onChange={(event) => setNotes(event.target.value)}
      />
      <button type="submit" disabled={!file || isSubmitting}>
        {isSubmitting ? 'Uploading…' : 'Submit Inspection'}
      </button>
    </form>
  );
};
