const express = require("express");
const cors = require("cors");
require("dotenv").config();
const https = require("https");
const fs = require(`fs`);
var subdomain = require('express-subdomain');

const authRouter = require("./routes/auth.routes");
const newsArtRouter = require("./routes/newsArt.routes");

const PORT = 5001;

const app = express();

app.use(cors());
app.use(express.json());


app.use(subdomain('test', newsArtRouter));
app.use(subdomain('test', authRouter));

/* app.use("/api", authRouter);
app.use("/api", newsArtRouter); */

const options = {
  key: fs.readFileSync(`/etc/letsencrypt/live/test.ryazantourism.ru/privkey.pem`),
  cert: fs.readFileSync(`/etc/letsencrypt/live/test.ryazantourism.ru/fullchain.pem`),
};

const server = https.createServer(options, app);

server.listen(PORT, () =>
  console.log("server start on ", `http://localhost:${PORT}`)
);
