const express = require('express');
const route = express();

const {SubTasksTb} = require('../Schemas/TaskMdl');

const connection = require('../Middlewares/connection');
//const joiValidation = require('../Middlewares/joiValidation');

//--------------Add Sub task------
route.get("/",connection,(req,res) => {
    SubTasksTb.find()
    .then((tasks) => {
        res.status(200).json(tasks);
    })
    .catch((finderr) => {
        res.status(409).json(finderr);
    });
});

route.post("/",connection,(req,res) => {
    console.log(req.body);
    const SubTaskobj = new SubTasksTb({
        TaskId:req.body.TaskId,
        SubTaskName:req.body.SubTaskName,
        Status: req.body.Status,
    });
    SubTaskobj.save()
    .then((subtask) => {
        res.status(200).json(subtask);
    })
    .catch((saveerr) => {
        res.status(409).json(saveerr);
    })
});

route.delete("/:id",connection,(req,res) => {
    const taskId = req.params.id;
    if(taskId)
    {
        SubTasksTb.findByIdAndDelete({_id:taskId})
        .then((tasks) => {
            res.status(200).json("Deleted");  
        })
        .catch((delerr) => {
            res.status(409).json("Id not found");
        });
    }
    else
    {
        res.status(404).json("Req params empty");
    }
});

route.patch("/:id",connection,(req,res) => {
    const taskId = req.params.id;
    if(taskId)
    {
        SubTasksTb.findByIdAndUpdate({_id:taskId},{$set:{Status:req.body.Status}})
        .then((tasks) => {
            res.status(200).json("Status Updated");  
        })
        .catch((updateerr) => {
            res.status(409).json("Id not found");
        });
    }
    else
    {
        res.status(404).json("Req params empty");
    }
});

module.exports = route;