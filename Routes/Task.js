const express = require('express');
const route = express();

const {TasksTb, SubTasksTb} = require('../Schemas/TaskMdl');

const connection = require('../Middlewares/connection');
const joiValidation = require('../Middlewares/joiValidation');

//--------------Add Main task------
route.get("/",connection,(req,res) => {
    SubTasksTb.find({},{'__v':0})
        .populate('TaskId',{'__v':0})
        .exec((exeerr, tasks) => {
            if(exeerr)
            {
                res.status(409).json(exeerr);
            }
            else
            {
                res.status(200).json(tasks);
            }
        });
});

route.get("/search:createdtime",(req,res) => {
    const createdtime = req.params.createdtime;
    SubTasksTb.find({CreatedTime:createdtime},{'__v':0})
        .populate('TaskId',{'__v':0})
        .exec((exeerr, tasks) => {
            if(exeerr)
            {
                res.status(409).json(exeerr);
            }
            else
            {
                res.status(200).json(tasks);
            }
        });
});

route.post("/",connection,joiValidation,(req,res) => {
    const Taskobj = new TasksTb({
        TaskName:req.body.TaskName,
        Status: req.body.Status,
    });
    Taskobj.save()
    .then((task) => {
        res.status(200).json(task);
    })
    .catch((saveerr) => {
        res.status(409).json(saveerr);
    })
});

route.delete("/:id",connection,(req,res) => {
    const taskId = req.params.id;
    if(taskId)
    {
        TasksTb.findByIdAndDelete({_id:taskId})
        .then((tasks) => {
            res.status(200).json("Task Deleted");  
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
        TasksTb.findByIdAndUpdate({_id:taskId},{$set:{Status:req.body.Status}})
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