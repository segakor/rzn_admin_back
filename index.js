const express = require("express");
const cors = require("cors");
require("dotenv").config();
const https = require("https");
const fs = require(`fs`);

const authRouter = require("./routes/auth.routes");
const newsArtRouter = require("./routes/newsArt.routes");
const newsRegionRouter = require("./routes/newsRegion.routes");
const uploadRouter = require("./routes/upload.routes");
const longReadRouter = require("./routes/longRead.routes");
const chtoPosmotretRouter = require("./routes/chtoPosmotret.routes");
const samostoyatelnyeMarshrutyRouter = require("./routes/samostoyatelnyeMarshruty.route");
const answersRouter = require("./routes/answers.routes");
const organizovannyeMarshrutyRouter = require("./routes/organizovannyeMarshruty.routes");

const { envMode, SSL_D } = require("./env_var");

console.log({ envMode });

const PORT = 5001;

const app = express();

const corsOptions = {
  origin: true, //included origin as true
  credentials: true, //included credentials as true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api-v2", authRouter);
app.use("/api-v2", newsArtRouter);
app.use("/api-v2", newsRegionRouter);
app.use("/api-v2", uploadRouter);
app.use("/api-v2", longReadRouter);
app.use("/api-v2", chtoPosmotretRouter);
app.use("/api-v2", samostoyatelnyeMarshrutyRouter);
app.use("/api-v2", answersRouter);
app.use("/api-v2", organizovannyeMarshrutyRouter);

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
