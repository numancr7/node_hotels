// callback functions

// uss kaam ka bad ya kam krna 

// function callback(){
//   console.log("Nouman is calling callback function");
// }

// const add = function(a, b, callback){
//   var res = a+b;
//   console.log("result is : "+res);
//   callback();
// }
// add(3,4,callback);


// const add = function (a,b, prince){
//   var res = a+b;
//   console.log("The Result is : "+res);
//   prince();
// }
// add(2,4,function(){console.log("hi nauman chaudhary complated")})
// var fs = require ('fs');
// var os = require ('os');

// var user = os.userInfo();
// console.log(user.username);

// fs.appendFile('greetings.txt', 'Hi' + user.username + '!\n', ()=>{
//   console.log("mission succesful")
// })
// console.log(os)


// const notes = require ('./notes.js');
// var _ = require('lodash');


// console.log('Srever file is available')
// var age = notes.age;
// console.log(age+ notes.addNumber(5,6))

// // npm i lodash

// var data = ["person","person",1,2,3,1,2,"name","age",2];
// var filter =_.uniq(data)
// console.log(filter)
// console.log("Hello")
// console.log("Hello")


const express = require('express');
const app = express();
const port = 3000;

// Ensure the database is connected before proceeding
const db = require("./db");  // Importing after establishing the connection

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Correct order of middleware and routing
app.get('/hotels', (req, res) => {
  res.send('Welcome to our hotels');
});

app.get('/motels', (req, res) => {
  res.send('Hello! Welcome to our motels');
});

const personroutes = require('./routes/personroutes');
app.use('/person', personroutes);

const menuroutes = require('./routes/menuroutes');
app.use('/menu', menuroutes);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
