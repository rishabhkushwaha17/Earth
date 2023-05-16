const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const directoryPath = path.join(__dirname, "path/to/your/directory");
app.use(cors.apply());
app.get("/directory", (req, res) => {
  // Read the directory's content
  const fs = require("fs");
  fs.readdir(
    "/Users/jasmeetsidhu/Documents/ThreeJS/Projects/Earth/Earth/Game/static/models/FightingGame/Player/Animations",
    (err, files) => {
      if (err) {
        console.error("Error:", err);
        res.status(500).send("Internal Server Error");
        return;
      }

      console.log(files);
      // Send the directory content as the response
      res.json(files);
    }
  );
});
app.get("/", (req, res) => {
  console.log(req);
});
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
