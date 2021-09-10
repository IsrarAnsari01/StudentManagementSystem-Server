let express = require("express");
let app = express();
const routing = require("./module/Routes/index");
const cors = require('cors');
const bodyParser = require("body-parser");
const port = 3500;
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "40mb" }));

routing.indexRouting(app);
// app.use("api/user", require("./module/Routes/user.routes"));

app.listen(port, (err) => {
  if (err) {
    console.log("Error in listening at " + port);
    console.log(err);
    return;
  }
  console.log("Server Started Successfully..!");
});
