const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    name: {
        type: String,
        required: true
    },

    score:{
        type: Number,
        default: 0
      }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);