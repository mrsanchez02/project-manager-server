const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController')
const auth = require('../middleware/auth');
const {check} = require('express-validator');

// Create a project.
// api/projects
router.post('/',
    auth,
    [
        check('name','Name is required').not().isEmpty()
    ],
    projectController.createProject
)
// Get all the projects.
router.get('/',
    auth,
    projectController.getProjects,
)

// update a project using ID.
router.put('/:id',
    auth,
    [
        check('name','Name is required').not().isEmpty()
    ],
    projectController.updateProject,
)

// Delete a project.
router.delete('/:id',
    auth,
    projectController.deleteProject
)

module.exports = router;