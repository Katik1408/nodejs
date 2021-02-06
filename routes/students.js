const { stderr } = require("chalk");
const express = require("express");
const { func } = require("joi");
const router = express.Router();
const Joi = require("joi");
const Student = require("../models/studentsmodel");

// let students = [
//   { id: 1, name: "Prasanna" },
//   { id: 2, name: "Kartik" },
//   { id: 3, name: "Manohar" },
// ];






router.get("/", (req, res) => {
  Student.find((err,students)=>{
    res.send(students);
    res.end();
  }).sort({name:1});
});

router.get("/:name", (req, res) => {
  // let student = Student.findOne({name:req.params.name},(err,doc)=>{
  //   if(err!== null){
  //     res.send(err);
  //     res.end();
  //   }
  //   res.send(doc);
  //   res.end();
  // });
//Student.findOneAndUpdate
let student = Student.findOne({name:req.params.name});
console.log(student);
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

router.post("/", (req, res) => {
  //define the Schema

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    age: Joi.number().required(),
    place: Joi.string().min(3).required(),
  });

  let { error } = schema.validate(req.body);

  console.log(error);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  // const student = {
  //   id: students.length + 1,
  //   name: req.body.name,
  //   place: req.body.place,
  //   age:req.body.age
  // };

  const student = new Student({
    name: req.body.name,
    age: req.body.age,
    place: req.body.place,
  });

  student
    .save()
    .then(() => {
      console.log("Successfully Inserted");
    })
    .catch((err) => console.log(err));

  // students.push(student);
  res.send(students);
});

router.put("/:studentId", (req, res) => {
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

router.delete("/:studentId", (req, res) => {
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
  students.splice(indexOfStudent, 1);
  res.send(students);
});

module.exports = router;
