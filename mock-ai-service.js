const http = require('http');

const PORT = 8000;

const server = http.createServer((req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === 'GET' && req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok', modelLoaded: true }));
        return;
    }

    if (req.method === 'POST' && req.url === '/analyze') {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        }).on('end', () => {
            // We don't parse the multipart body deeply, just return mock data
            // In a real mock we might parse fields, but for now we assume success

            const mockResponse = {
                inspectionId: "mock-id", // This should ideally match input but for mock it's ok
                plate: "B 1234 XYZ",
                vin: "MOCKVIN123456",
                totalDamages: 2,
                avgConfidence: 0.88,
                score: 85,
                damages: [
                    {
                        class: "Dent",
                        severity: "Medium",
                        confidence: 0.92,
                        bbox: { x: 100, y: 100, width: 200, height: 150 }
                    },
                    {
                        class: "Scratch",
                        severity: "Low",
                        confidence: 0.85,
                        bbox: { x: 300, y: 200, width: 100, height: 50 }
                    }
                ],
                vctMetadata: {
                    vehicleInfo: {
                        plate: "B 1234 XYZ",
                        vin: "MOCKVIN123456",
                        label: "Mock Vehicle"
                    },
                    inspectionDate: new Date().toISOString(),
                    damageCount: 2,
                    overallScore: 85
                }
            };

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(mockResponse));
        });
        return;
    }

    res.writeHead(404);
    res.end();
});

server.listen(PORT, () => {
    console.log(`Mock AI Service running on port ${PORT}`);
});
