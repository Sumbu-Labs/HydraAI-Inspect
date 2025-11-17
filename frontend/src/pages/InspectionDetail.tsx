import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { InspectionResult, InspectionResultProps } from '../components/InspectionResult';
import { apiClient } from '../services/apiClient';

export const InspectionDetail = () => {
  const { id } = useParams();
  const [inspection, setInspection] = useState<InspectionResultProps | null>(null);

  useEffect(() => {
    if (!id) return;
    apiClient
      .get(`/inspections/${id}`)
      .then((response) => setInspection(response.data))
      .catch(() =>
        setInspection({
          id,
          status: 'pending'
        })
      );
  }, [id]);

  if (!id) {
    return (
      <main className="layout">
        <p>Missing inspection ID.</p>
        <Link to="/">Back</Link>
      </main>
    );
  }

  return (
    <main className="layout">
      <Link to="/">← Back to inspections</Link>
      <h1>Inspection Detail</h1>
      {inspection ? <InspectionResult {...inspection} /> : <p>Loading inspection...</p>}
    </main>
  );
};
