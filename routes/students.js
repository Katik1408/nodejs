const { stderr } = require("chalk");
const express = require("express");
const { func, any, number } = require("joi");
const router = express.Router();
const Joi = require("joi");
const Student = require("../models/studentsmodel");

// let students = [
//   { id: 1, name: "Prasanna" },
//   { id: 2, name: "Kartik" },
//   { id: 3, name: "Manohar" },
// ];

router.get("/", (req, res) => {
  try {
    Student.find((err, students) => {
      res.send(students);
      res.end();
    }).sort({ name: 1 });
  } catch {
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:id", (req, res) => {
  // let student = Student.findOne({name:req.params.name},(err,doc)=>{
  //   if(err!== null){
  //     res.send(err);
  //     res.end();
  //   }
  //   res.send(doc);
  //   res.end();
  // });
  //Student.findOneAndUpdate
  let student = Student.findById({_id : req.params.id}, (data) => {
    res.send(data);
    res.end();
  });

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
  res.send(student);
});

router.put("/:id", (req, res) => {
  //Checked if the student exist or not
  //let student = students.find((c) => c.id === parseInt(req.params.studentId));
  console.log("Logging id from Request");
  console.log(req.params.id);

  console.log("Log End");
  st: any;
  let s = Student.findById(req.params.id, (err, std) => {
    st = std;
    res.send(std);
    res.end();
  });

  Student.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      age: req.body.age,
      place: req.body.place,
    },
    { rawResult: true },
    (err, student) => {
      console.log(student);
      res.send(student);
    }
  );
  // if (!st) {
  //   res
  //     .status(404)
  //     .send(
  //       `Error Occurend Student with ${req.params.id} is not available`
  //     )
  //     .end();
  //}

  //Validate the name

  // const schema = Joi.object({
  //   name: Joi.string().min(3).required(),
  // });

  // let { error } = schema.validate(req.body);

  // console.log(error);

  // if (error) {
  //   res.status(400).send(error.details[0].message);
  //   return;
  // }
  // student.name = req.body.name;
  // res.send(students);
});

router.delete("/:studentId", (req, res) => {
  //Checked if the student exist or not
  //let student = students.find((c) => c.id === parseInt(req.params.studentId));

  Student.findByIdAndDelete(req.params.studentId, (err, student) => {
    res.send(student);
    res.end();
  });

  // if (!student) {
  //   res
  //     .status(404)
  //     .send(
  //       `Error Occurend Student with ${req.params.studentId} is not available`
  //     )
  //     .end();
  // }

  // const indexOfStudent = students.indexOf(student);
  // console.log(students);
  // students.splice(indexOfStudent, 1);
  // res.send(students);
});

module.exports = router;
