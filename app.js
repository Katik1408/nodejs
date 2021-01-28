const express = require("express");
const logger = require("./middleware/logging");
app = express();
const students = require("./routes/students");
const mongoose = require("mongoose");

//type Mongoose = typeof mongoose

mongoose
  .connect("mongodb://localhost/demodb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => console.log(err));

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  place: { type: String, required: true },
});

/**
   
     Collection Name ------- Model Name
          students  	---- 	Student
   */

const Student = mongoose.model("Student", studentSchema);

const newStudentDoc = new Student({
  name: "Rahul",
  age: 22,
  place: "Delhi",
});

newStudentDoc
  .save()
  .then(() => console.log("Inserted Successfully"))
  .catch((err) => console.log(err));

app.set("view engine", "pug");
app.set("views", "./views");
app.set("hello", "Now this is new value");

app.use(express.json());
app.use(logger);
app.use(express.static("public"));
app.use("/api/students", students);

app.get("/", (req, res) => {
  res.render("index", {
    title: "ExpressApp",
    message: "Hello from Pug",
  });
  res.end();
});

app.get("/h1", (req, res) => {
  res.send(app.get("hello"));
});

app.listen(3000, () => {
  console.log("Listeing on port 3000");
});

