const Task = require('../models/Task');
const Project = require('../models/Projects');
const { validationResult } = require('express-validator');

// Create a new task
exports.createTask = async (req,res)=> {
    // Check for errors.
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({errors: errors.array()})
    }

    try {

        // Check if project exist.
        const { project } = req.body;

        const projectExist = await Project.findById(project);
        if(!projectExist) {
            return res.status(404).json({msg:'Project not found!'})
        }

        // Check if actual project corresponds to the user autenticated.
        if(projectExist.creator.toString() !== req.user.id){
            return res.status(401).json({msg:'No authorized.'})
        }

        // Create task.
        const task = new Task(req.body);
        await task.save();
        res.json({task});
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Oops. something happens.")
    }

}

// Get task by project.
exports.getTasks = async (req, res) => {
    // Check for errors.
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({errors: errors.array()})
    }

    try {

        // Check if project exist.
        const { project } = req.query;

        const projectExist = await Project.findById(project);
        
        if(!projectExist) {
            return res.status(404).json({msg:'Project not found!'})
        }

        // Check if actual project corresponds to the user autenticated.
        if(projectExist.creator.toString() !== req.user.id){
            return res.status(401).json({msg:'No authorized.'})
        }

        //Get task by projectid
        const tasks = await Task.find({ project }).sort({created: -1});
        res.json({tasks})

    } catch (error) {
        console.log(error)
        res.status(500).send("Oops. something happens getting tasks.")
    }
};

exports.updateTask = async (req,res) => {
    // Check for errors.
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        // Check if project exist.
        const { project, name, status } = req.body;

        // Check if task exist.
        let task = await Task.findById(req.params.id);

        if(!task) {
            return res.status(404).json({msg:"This task doesn't exist!"})
        }

        // Extract project.
        const projectExist = await Project.findById(project);

        if(!projectExist) {
            return res.status(404).json({msg:'Project not found!'})
        }

        // Check if actual project corresponds to the user autenticated.
        if(projectExist.creator.toString() !== req.user.id){
            return res.status(401).json({msg:'No authorized.'})
        }

        // Create a new object with the new info.
        const newTask = {};
        
        newTask.name = name;
        newTask.status = status;

        // Save task
        task = await Task.findOneAndUpdate({_id: req.params.id },newTask,{new:true});
        res.json({task});
        
    } catch (error) {
        console.log(error)
        res.status(500).send("Oops. something happens.")        
    }
};

exports.deleteTask = async (req,res) => {
     // Check for errors.
     const errors = validationResult(req);
     if( !errors.isEmpty() ){
         return res.status(400).json({errors: errors.array()})
     }
 
     try {
         // Check if project exist.
         const { project } = req.query;
 
         // Check if task exist.
         let task = await Task.findById(req.params.id);
 
         if(!task) {
             return res.status(404).json({msg:"This task doesn't exist!"})
         }
 
         // Extract project.
         const projectExist = await Project.findById(project);
 
         if(!projectExist) {
             return res.status(404).json({msg:'Project not found!'})
         }
 
         // Check if actual project corresponds to the user autenticated.
         if(projectExist.creator.toString() !== req.user.id){
             return res.status(401).json({msg:'No authorized.'})
         }
 
        // Delete task
        await Task.findOneAndRemove({_id:req.params.id});
        res.json({msg: "Task deleted."});
         
     } catch (error) {
         console.log(error)
         res.status(500).send("Oops. something happens.")        
     }
};