const express = require("express");
const config = require("config");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// app.use('/test', require('./routes/test.routes'));
// app.use('/album', require('./routes/album.routes'));
app.use("/event", require("./routes/event.routes"));

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Conected to MongoDB");
    mongoose.connection.on("connected", () => {
      console.log("Mongoose is connected!!!!");
    });
    app.listen(8000, () => {
      console.log(`App has been started on port ${PORT}`);
    });
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();
