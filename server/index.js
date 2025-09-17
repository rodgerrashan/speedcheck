// server/server.ts

import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001; // Choose a port different from your React app

// 1. Enable CORS
// This allows your React app (e.g., running on port 5173) to make requests to this server.
app.use(cors());

// 2. Define the Speed Test Endpoint
// This is the target for the upload test from your frontend.
app.post('/api/speedtest', (req, res) => {
  // We don't need to process or save the data.
  // We just receive the request and immediately send a success response.
  res.status(200).send({ message: 'Upload received' });
});

// 3. Start the Server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});