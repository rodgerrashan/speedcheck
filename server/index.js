// server/server.ts

import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001; 

app.use(cors());

app.post('/api/speedtest', (req, res) => {
  res.status(200).send({ message: 'Upload received' });
});

// 3. Start the Server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});