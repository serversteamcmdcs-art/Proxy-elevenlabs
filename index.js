const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  "/",
  createProxyMiddleware({
    target: "https://api.elevenlabs.io",
    changeOrigin: true,
    on: {
      proxyReq: (proxyReq, req) => {
        // Forward API key from client or use env variable
        if (process.env.ELEVENLABS_API_KEY && !req.headers["xi-api-key"]) {
          proxyReq.setHeader("xi-api-key", process.env.ELEVENLABS_API_KEY);
        }
      },
    },
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
