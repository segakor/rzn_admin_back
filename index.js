const express = require("express");
const cors = require("cors");
require("dotenv").config();
const https = require("https");
const fs = require(`fs`);

const authRouter = require("./routes/auth.routes");
const newsArtRouter = require("./routes/newsArt.routes");
const uploadRouter = require("./routes/upload.routes");

const PORT = 5001;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api-v2", authRouter);
app.use("/api-v2", newsArtRouter);
app.use("/api-v2", uploadRouter);

app.use(express.static(__dirname));


const options = {
  key: fs.readFileSync(`/etc/letsencrypt/live/ryazantourism.ru/privkey.pem`),
  cert: fs.readFileSync(`/etc/letsencrypt/live/ryazantourism.ru/fullchain.pem`),
};

const server = https.createServer(options, app);

server.listen(PORT, () =>
  console.log("server start on ", `http://localhost:${PORT}`)
);
