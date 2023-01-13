const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 2
  },

  lastName: {
    type: String,
    minlength: 2
  },

  email: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    minlength: 4,
    required: true
  },

}, { timestamps: true })

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
    delete returnedObject.password
  }
})

module.exports = mongoose.model('User', UserSchema)