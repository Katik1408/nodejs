const express = require("express");
const Joi = require("joi");
const logg = require('./logging');
app = express();


app.use(logg.logger);
app.use(express.json());

let students = [
  { id: 1, name: "Prasanna" },
  { id: 2, name: "Kartik" },
  { id: 3, name: "Manohar" },
];

app.get("/", (req, res) => {
  res.send("Hello from Express ${} ");
  res.end();
});

app.get("/api/students", (req, res) => {
  res.send(JSON.stringify(students));
  res.end();
});

app.get("/api/students/:studentId", (req, res) => {
  let student = students.find((c) => c.id === parseInt(req.params.studentId));

  if (!student) {
    res.status(404);
    res.send(
      `Error Occurend Student with ${req.params.studentId} is not available`
    );
    res.end();
  }
  res.send(student);
  res.end();
});

app.post("/api/students", (req, res) => {
  //define the Schema

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  let { error } = schema.validate(req.body);

  console.log(error);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const student = {
    id: students.length + 1,
    name: req.body.name,
  };

  students.push(student);
  res.send(students);
});

app.put("/api/students/:studentId", (req, res) => {

  //Checked if the student exist or not
  let student = students.find((c) => c.id === parseInt(req.params.studentId));

  if (!student) {
    res
      .status(404)
      .send(
        `Error Occurend Student with ${req.params.studentId} is not available`
      )
      .end();
  }


  //Validate the name

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  let { error } = schema.validate(req.body);

  console.log(error);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  student.name = req.body.name;
  res.send(students);
});

app.delete('/api/students/:studentId',(req,res)=>{
 //Checked if the student exist or not
 let student = students.find((c) => c.id === parseInt(req.params.studentId));

 if (!student) {
   res
     .status(404)
     .send(
       `Error Occurend Student with ${req.params.studentId} is not available`
     )
     .end();
 }

 const indexOfStudent = students.indexOf(student);
console.log(students);
 students.splice(indexOfStudent,1);
 res.send(students);

});

app.listen(3000);
