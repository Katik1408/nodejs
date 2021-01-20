const express = require("express");
const logger = require('./middleware/logging');
app = express();
const students = require('./routes/students');


app.set('view engine','pug');
 app.set('views','./views');


app.use(express.json());
app.use(logger);
app.use(express.static('public'));
app.use('/api/students',students);

app.get("/", (req, res) => {

  res.render('index',{
    title:'ExpressApp',
    message: 'Hello from Pug'
  });


  res.end();
});

app.listen(3000);
