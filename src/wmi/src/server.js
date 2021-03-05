require("colors");
require("dotenv-safe").config();

const
{ log } = console,
{ PORT=3000 } = process.env,
{ resolve } = require("path"),
cors = require("cors"),
compression = require("compression"),
express = require("express"),
app = express();

// https://github.com/expressjs/cors
app.use(compression());
app.use(express.static(resolve(".dist", "app")));

app.use("*", cors());
app.get("*", (req, res) => {
    res.sendFile(resolve(".dist", "app", "index.html"));
});

app.listen(PORT, () => {
    log(`🚀 Server: ${`http://localhost:${PORT}`.green.underline}`.bold);
});