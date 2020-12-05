const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  full_name:{
    type: String,
    required:true,
    unique: true
  },

  avatar: {
    type: String
  }
  
});

module.exports = User = mongoose.model('user',UserSchema);