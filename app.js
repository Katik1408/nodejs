const express = require("express");
const logger = require("./middleware/logging");
app = express();
const students = require("./routes/students");
const mongoose = require("mongoose");
const cors = require('cors');

//const createMiddleware = require('@apidevtools/swagger-express-middleware');
////const pathToSwaggerUi = require('swagger-ui-dist').absolutePath()
// mongoose
//   .connect("mongodb://localhost/demodb", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connection Successfull");
//   })
//   .catch((err) => console.log(err));

// const studentSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   age: { type: Number, required: true },
//   place: { type: String, required: true },
// });

/**
   
     Collection Name ------- Model Name
          students  	---- 	Student
   */

//const Student = mongoose.model("Student", studentSchema);

// async function createStudent() {
//   const newStudentDoc = new Student({
//     name: "Suresh",
//     age: 22,
//     place: "Delhi",
//   });
//   await newStudentDoc
//     .save()
//     .then(() => console.log("Inserted Successfully"))
//     .catch((err) => console.log(err));
// }

//createStudent();

// async function getStudents() 
//  { const student = await Student.find({age : {$lte : 25}}).limit(10).sort({name: 1});
//   console.log(student);
// }
// getStudents();

//eq euqals
//lt less than
//lte less than or equal to
//gt greater than
//gte greater than or equal to
//in
//nin (not in)
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition:{
    info:{
      title:'Students API',
      description:'Students API Information',
      contact:{
        name:"Amazing Developer"
      },
      servers:["http://localhost:3000"]
    }
  },
  apis:["app.js"]
};

//Middlewares inside APIs
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use(cors());
app.use("/index",swaggerUi.serve,swaggerUi.setup(swaggerDocs));
  
app.set("view engine", "pug");
app.set("views", "./views");
app.set("hello", "Now this is new value");

//app.use(express.static(pathToSwaggerUi))
// createMiddleware('Students.yaml', app, function(err, middleware) {
//   // Add all the Swagger Express Middleware, or just the ones you need.
//   // NOTE: Some of these accept optional options (omitted here for brevity)
//   app.use(
//       middleware.metadata(),
//       middleware.CORS(),
//       middleware.files(),
//       middleware.parseRequest(),
//       middleware.validateRequest(),
//       middleware.mock()
//   );

//   });

app.use(express.json());
app.use(logger);
app.use(express.static("public"));
app.use("/api/students", students);


// Annotation -- @swagger

/**
 * @swagger
 * definitions:
 *    Student:
 *     type: Object
 *     properties:
 *      name:
 *        type: String
 *        description: name of the student
 *        example: 'Karthik Saxena'
 *      age:
 *        type: number
 *        description: Age of the student
 *        example: 25
 *      place:
 *        type: String
 *        description: Place of the student
 *        example: 'Bangalore'
 * 
 */



 /**
  * 
  * THis is comment
  */



//Routes 
/**
 * @swagger
 * /api/students:
 *  get:
 *     description: Use to request all students
 *     responses:
 *          '200':
 *           description: A Successful response
 *  
 * 
 */



 /**
  * @swagger
  * /api/students:
  *  get:
  *     description: Used to request something
  *     responses:
  *         '201':
  *           description: This is success
  * 
  */




/**
 * @swagger
 * /api/students:
 *  post:
 *     summary: Create Student
 *     description: Use to Create new Students
 *     requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref:'#definition/Student'
 *     responses:
 *          201:
 *           description: A Successful response
 *          500:
 *            description: Internal Server Error
 */ 


/**
 * @swagger
 * /api/students/{studentId}:
 *  parameters: 
 *   - in : path
 *     name: studentId
 *     type: string
 *     required: true
 *  delete:
 *      summary: It will delete the students
 *      description: Delete Students
 *      responses:
 *          200:
 *            description: Successful Deletion
 *          500:
 *            description: Internal Server Error
 * 
 * 
 */

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


const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listeing on port ${port}`);
});

/**
 * eq
 * ne 
 * gt
 * gte
 * lt
 * lte
 * in
 * nin
 */
/**
 * async function getStudents() {
  const student = await Student.find({ place: {$eq:"Bangalore"} })
    .limit(10)
    .sort({ name: 1 }).select({name:1,place:1});
    console.log(student);
}
getStudents();
 */
