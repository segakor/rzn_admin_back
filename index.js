const express = require("express");
const cors = require("cors");
require("dotenv").config();
const https = require("https");
const fs = require(`fs`);
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");

const authRouter = require("./routes/auth.routes");
const newsArtRouter = require("./routes/newsArt.routes");
const newsRegionRouter = require("./routes/newsRegion.routes");
const uploadRouter = require("./routes/upload.routes");
const longReadRouter = require("./routes/longRead.routes");
const chtoPosmotretRouter = require("./routes/chtoPosmotret.routes");
const samostoyatelnyeMarshrutyRouter = require("./routes/samostoyatelnyeMarshruty.route");
const answersRouter = require("./routes/answers.routes");
const organizovannyeMarshrutyRouter = require("./routes/organizovannyeMarshruty.routes");
const gidRouter = require("./routes/gid.routes");
const promturizmRouter = require("./routes/promturizm.routes");
const bannerRouter = require("./routes/banner.routes");
const nasledieRouter = require("./routes/nasledie.routes");
const uploadFileRouter = require("./routes/uploadFile.routes");
const bibliotekaRouter = require("./routes/biblioteka.routes");

const routes = [
  authRouter,
  newsArtRouter,
  newsRegionRouter,
  uploadRouter,
  longReadRouter,
  chtoPosmotretRouter,
  samostoyatelnyeMarshrutyRouter,
  answersRouter,
  organizovannyeMarshrutyRouter,
  gidRouter,
  promturizmRouter,
  bannerRouter,
  nasledieRouter,
  uploadFileRouter,
  bibliotekaRouter,
];

const { envMode, SSL_D } = require("./env_var");

console.log({ envMode });

const PORT = 5001;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const logsDirectory = path.join(__dirname, "logs");
if (!fs.existsSync(logsDirectory)) {
  fs.mkdirSync(logsDirectory);
}

const logStream = fs.createWriteStream(path.join(logsDirectory, "logs.log"), {
  flags: "a",
});

//logger
app.use(
  morgan("tiny", {
    stream: logStream,
    skip: (req, _res) => !["POST", "PUT", "DELETE"].includes(req.method),
  })
);

app.use((req, res, next) => {
  if (["POST", "PUT", "DELETE"].includes(req.method)) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url,
      body: req.body,
    };
    logStream.write(JSON.stringify(logEntry) + "\n");
  }
  next();
});

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

app.use(cors(corsOptions));
app.use(express.json());

routes.forEach((router) => {
  app.use("/api-v2", router);
});

app.use("/api-v2", express.static(__dirname));

if (envMode === "production") {
  const options = {
    key: fs.readFileSync(`${SSL_D}/privkey.pem`),
    cert: fs.readFileSync(`${SSL_D}/fullchain.pem`),
  };

  const server = https.createServer(options, app);

  server.listen(PORT, () => console.log(`http://localhost:${PORT}`));

  return;
}

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
