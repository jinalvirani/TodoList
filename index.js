const express = require('express');
const bodyParser = require('body-parser');
const mainTaskRoute = require('./Routes/Task');
const subTaskRoute = require('./Routes/Subtask');
const app = express();

app.use(bodyParser.json());

app.use('/Task',mainTaskRoute);
app.use('/subTask',subTaskRoute);

app.listen(8080,()=>{
    console.log("app is running");
});