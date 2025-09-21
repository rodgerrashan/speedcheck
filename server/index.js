// server/server.ts
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');


const app = express();
const port = 3001;

app.use(cors());

// ✅ Download endpoint that checks if file exists
app.get('/api/download', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'serverdummy.dat');

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File not found
      return res.status(404).json({ error: 'Test file not found' });
    }

    // Set headers so the browser knows it's a file
    res.setHeader('Content-Disposition', 'attachment; filename=serverdummy.dat');
    res.setHeader('Content-Type', 'application/octet-stream');

    // Stream file to response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  });
});

// ✅ Endpoint to simulate upload test
app.post('/api/speedtest', (req, res) => {
  res.status(200).send({ message: 'Upload received' });
});


// Endpoint to stream video
app.get("/video", (req, res) => {
  const videoPath = path.join(__dirname, "public", "videos/4k-sample.mp4");
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    // Handle Range requests
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? Math.min(parseInt(parts[1], 10), fileSize - 1) : fileSize - 1;

    if (start >= fileSize || end >= fileSize) {
      res.status(416).send("Requested range not satisfiable");
      return;
    }

    const contentLength = end - start + 1;
    const headers = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": contentLength,
      "Content-Type": "video/mp4",
    };

    res.writeHead(206, headers);
    const stream = fs.createReadStream(videoPath, { start, end });
    stream.pipe(res);
  } else {
    // No Range header – serve full file
    const headers = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, headers);
    fs.createReadStream(videoPath).pipe(res);
  }
});


// ✅ Start the Server
app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
  console.log(`✅ Video server running at http://localhost:${port}/video`);
  console.log(`📂 File download at http://localhost:${port}/api/download`);
});

