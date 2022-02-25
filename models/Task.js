const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: false
    },
    created:{
        type: Date,
        default: Date.now()
    },
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }
})

module.exports = mongoose.model('task',taskSchema);