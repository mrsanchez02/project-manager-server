const Project = require('../models/Projects');
const { validationResult } = require('express-validator')

exports.createProject = async (req,res)=> {

    // Check for errors.
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        // Create a new project.
        const project = new Project(req.body);

        // Save the creator via JWT.
        project.creator = req.user.id;

        // Save  project.
        project.save();
        res.json(project);

    } catch (error) {
        console.log(error);
        res.status(500).send("Oops, there's an error.");
    }
}

// Get all the projects from actual user.
exports.getProjects = async(req,res) => {
    try {
        const projects = await Project.find({creator: req.user.id}).sort({creator:-1});
        res.json({ projects });
    } catch (error) {
        console.log(error);
        res.status(500).send("Oops, there's an error.");
    }
}

// Update a project.
exports.updateProject = async (req,res)=>{
    // Check for errors.
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({errors: errors.array()})
    }

    // Destructuring project information.
    const { name } = req.body;
    const newProject = {};

    if(name){
        newProject.name = name;
    }

    try {
        // Check ID
        let project = await Project.findById(req.params.id);

        // Check if project exist.
        if(!project){
            return res.status(404).json({msg:'Project not found.'});
        }

        // Check project creator.
        if(project.creator.toString() !== req.user.id){
            return res.status(401).json({msg:'No authorized.'})
        }


        // Update.
        project = await Project.findByIdAndUpdate({_id: req.params.id },{$set: newProject},{new:true});

        res.json({project});

    } catch (error) {
        console.log(error);
        res.status(500).send("Error server.");
    }
}

// Delete a project by id.
exports.deleteProject = async (req,res ) => {
    // Check for errors.
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json({errors: errors.array()})
    }

    try {
        // Check ID
        let project = await Project.findById(req.params.id);

        // Check if project exist.
        if(!project){
            return res.status(404).json({msg:'Project not found.'});
        }

        // Check project creator.
        if(project.creator.toString() !== req.user.id){
            return res.status(401).json({msg:'No authorized.'})
        }

        // Delete project.
        await Project.findOneAndRemove({_id:req.params.id});
        res.json({msg: "Project deleted."});
    } catch (error) {
        console.log(error);
        res.status(500).send("Error server.");
    }
}