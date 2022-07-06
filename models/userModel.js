const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }, 
  password: {
    type: String,
    required: true,
    select: false
  }
})

userSchema.pre('save', async function(next){
  this.password = await bcrypt.hash(this.password, 12);
  next();
})

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);
module.exports = User;