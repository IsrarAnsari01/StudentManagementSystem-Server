let express = require("express");
let app = express();
const routing = require("./module/Routes/index");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 3500;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "40mb" }));
app.set("views", "./module/nodemailer/templates");
app.set("view engine", "ejs");
app.use(express.static("public"));
// app.get("/", function (req, res) {
//   res.render("resetPassword", { token: "test12313" });
// });

routing.indexRouting(app);

app.listen(port, (err) => {
  if (err) {
    console.log("Error in listening at " + port);
    console.log(err);
    return;
  }
  console.log("Server Started Successfully..!");
});
