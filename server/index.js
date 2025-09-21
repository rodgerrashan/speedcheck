const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(cors());

// ✅ Ping endpoint
app.get('/speedtest/ping', (req, res) => {
  console.log(`[Ping] Request received from ${req.ip} at ${new Date().toISOString()}`);
  res.status(200).send({ message: 'pong' });
});

// ✅ Download endpoint
app.get('/speedtest/download', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'serverdummy.dat');

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(`[Download] File not found requested by ${req.ip} at ${new Date().toISOString()}`);
      return res.status(404).json({ error: 'Test file not found' });
    }

    console.log(`[Download] Request received from ${req.ip} at ${new Date().toISOString()}`);
    res.setHeader('Content-Disposition', 'attachment; filename=serverdummy.dat');
    res.setHeader('Content-Type', 'application/octet-stream');

    const fileStream = fs.createReadStream(filePath);
    fileStream.on('end', () => {
      console.log(`[Download] File sent to ${req.ip} at ${new Date().toISOString()}`);
    });
    fileStream.pipe(res);
  });
});

// ✅ Upload endpoint
app.post('/speedtest/upload', (req, res) => {
  console.log(`[Upload] Upload request received from ${req.ip} at ${new Date().toISOString()}`);
  // Consume the request data (optional, just to measure real upload)
  let receivedBytes = 0;
  req.on('data', (chunk) => {
    receivedBytes += chunk.length;
  });
  req.on('end', () => {
    console.log(`[Upload] Upload complete from ${req.ip}, ${receivedBytes} bytes received at ${new Date().toISOString()}`);
    res.status(200).send({ message: 'Upload received' });
  });
});

// ✅ Video endpoint (unchanged, optional logging)
app.get("/video", (req, res) => {
  // console.log(`[Video] Request from ${req.ip} at ${new Date().toISOString()}`);
  const videoPath = path.join(__dirname, "public", "videos/4k-sample.mp4");
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
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
    const headers = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, headers);
    fs.createReadStream(videoPath).pipe(res);
  }
});

// ✅ Start the server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`🏓 Ping endpoint: http://localhost:${port}/speedtest/ping`);
  console.log(`📂 Download endpoint: http://localhost:${port}/speedtest/download`);
});
