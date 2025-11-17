import { QRCodeSVG } from 'qrcode.react';

type QRViewerProps = {
  value: string;
};

export const QRViewer = ({ value }: QRViewerProps) => (
  <div className="qr-viewer">
    <p>Scan to open CIP-68 metadata:</p>
    <QRCodeSVG value={value} size={128} />
  </div>
);
