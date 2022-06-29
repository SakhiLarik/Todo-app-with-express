const express = require("express");
const routes = require("./routes/routes");
const host = "127.0.0.1";
const port = 3000;

app = express();
routes.routes(app);
app.listen(port, host, () => {
  console.log(`app is running at http://${host}:${port}`);
});
