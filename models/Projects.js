const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    created:{
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Project',projectSchema);