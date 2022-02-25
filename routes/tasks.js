const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

// Create a task.
// api/tasks
router.post('/',
    auth,
    [
        check('name','The name is required').not().isEmpty(),
        check('project','The project is required').not().isEmpty()
    ],
    taskController.createTask
);

// Get task by project
router.get('/',
    auth,
    taskController.getTasks
)

// Update task.
router.put('/:id',
    auth,
    taskController.updateTask
)

// Delete task.
router.delete('/:id',
    auth,
    taskController.deleteTask
)


module.exports = router;