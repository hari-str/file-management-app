const express = require("express");
const app = express();

app.get("/api", (req, res) => {
  res.send("API is working fine!!!");
});

//listening the server
app.listen(8080, () => {
  console.log("Server is running on", 8080);
});
