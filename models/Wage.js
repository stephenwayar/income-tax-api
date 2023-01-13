const mongoose = require('mongoose')

const WageSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },

  minimum_wage: {
    type: Number,
    required: true,
    minlength: 1
  }

}, { timestamps: true })

WageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Wage', WageSchema)