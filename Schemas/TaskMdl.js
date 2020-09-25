const mongoose = require("mongoose");
const TaskSchema = mongoose.Schema({
    TaskName: {type:String, require:true},
    Status: {type:String},
    CreatedTime: {type:Date, default: new Date()}
});

const TaskMdl = mongoose.model("taskstb",TaskSchema);

const SubTaskSchema = mongoose.Schema({
    TaskId: {type: mongoose.Schema.Types.ObjectId, ref: 'taskstb'},
    SubTaskName: {type:String, require:true},
    Status: {type:String},
    CreatedTime: {type:Date, default: new Date()}
})

const SubTaskMdl = mongoose.model("Subtaskstb",SubTaskSchema);

module.exports = {TasksTb: TaskMdl, SubTasksTb: SubTaskMdl}