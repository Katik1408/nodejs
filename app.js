const express = require('express');

app = express();


let students =[
    {id:1,name:"Prasanna"},
{id:2,name:"Kartik"},
{id:3,name:"Manohar"}]


app.get('/',(req,res) => {
    res.send('Hello from Express ${} ');
    res.end();
});

app.get('/api/students',(req,res)=>{
        res.send(JSON.stringify(students));
        res.end();
});

app.get('/api/students/:studentId',(req,res)=>{
   
    let student = students.find( c=>c.id === parseInt(req.params.studentId));
   
   // if(!student) res.status(404).send('No Student with this id');
   
   if(!student) {
       res.status(404);
       res.send(`Error Occurend Student with ${req.params.studentId} is not available` );
       res.end();
   }
    res.send(student);
    res.end();
})



app.listen(3000);


