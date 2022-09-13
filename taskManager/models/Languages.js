const mongoose = require('mongoose');
const LanguagesSchema = new mongoose.Schema({
  name:{
    type:"string",
    required:true
  },
  completed:{
    type:Boolean,
    required:true
  }
});
module.exports = mongoose.model(' Languages', LanguagesSchema);
// Model.find({ completed: true });