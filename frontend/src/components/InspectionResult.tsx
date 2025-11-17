import { QRViewer } from './QRViewer';

export type InspectionResultProps = {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  score?: number;
  damageSummary?: string;
  metadataUrl?: string;
};

export const InspectionResult = ({ id, status, score, damageSummary, metadataUrl }: InspectionResultProps) => (
  <article className="card">
    <header>
      <h3>Inspection #{id}</h3>
      <span className={`status status-${status}`}>{status}</span>
    </header>
    {score && <p>Condition score: {score}</p>}
    {damageSummary && <p>Damage: {damageSummary}</p>}
    {metadataUrl ? <a href={metadataUrl}>View Vehicle Condition Token</a> : <p>Metadata not published yet.</p>}
    {metadataUrl && <QRViewer value={metadataUrl} />}
  </article>
);
