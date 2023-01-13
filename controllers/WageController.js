const Wage = require('../models/Wage')
const logger = require('../utils/logger')

const get_wages = async (_req, res, next) => {
  try{
    const wages = await Wage.find({ })

    res.status(200).json(wages)
  }catch(error){
    next(error)
  }
}

const get_wage = async (req, res, next) => {
  const ID = req.params.id

  try{
    const wage = await Wage.findById(ID)

    res.status(200).json(wage)
  }catch(error){
    next(error)
  }
}

const create_wage = async (req, res, next) => {
  if (!req.user) {
    logger.info('token is missing')
    return res.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const { name, minimum_wage } = req.body

  try{
    const wage = await Wage.findOne({ name })

    if(wage){
      return res.status(400).json({
        success: false,
        message: `A wage with the name ${name} already exists`
      })
    }

    const newWage = new Wage({ name, minimum_wage })
    const savedWage = await newWage.save()

    res.status(200).json(savedWage)
  }catch(error){
    logger.error('Failed to save new wage', error)

    res.status(400).json({
      success: false,
      message: 'There was an error saving new wage'
    })  
  }
}

const update_wage = async (req, res) => {
  if (!req.user) {
    logger.info('token is missing')
    return res.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const ID = req.params.id
  const { minimum_wage } = req.body

  if (!minimum_wage) {
    return res.status(401).json({
      error: 'minimum wage value is reuired'
    })
  }

  const wage = await Wage.findById(ID)

  if(wage){
    try{
      console.log(minimum_wage)
      const updatedWage = await Wage.findByIdAndUpdate(
        ID,
        { minimum_wage },
        { new: true, runValidators: true, context: 'query' }
      )

      res.status(200).json(updatedWage)
    }catch(error){
      logger.error('Failed to update minimum wage value', error)

      res.status(400).json({
        success: false,
        message: 'Failed to update minimum wage value'
      })
    }
  }else{
    logger.error(`Wage with the ID of ${ID} does not exist or has been removed from the database`)

    res.status(404).json({
      success: false,
      message: `Wage with the ID of ${ID} does not exist or has been removed from the database`
    })  
  }
}

const delete_wage = async (req, res) => {
  if (!req.user) {
    logger.info('token is missing')
    return res.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const wage = await Wage.findById(req.params.id)

  if(wage){
    try{
      await Wage.findByIdAndDelete(req.params.id)

      res.status(200).end()
    }catch(error){
      logger.error('Failed to delete wage', error)

      res.status(400).json({
        success: false,
        message: 'Failed to delete wage! Try again'
      })
    }
  }else{
    logger.info(`Wage with the ID of ${req.params.id} does not exist or has already been removed from the database`)

    res.status(400).json({
      success: false,
      message: `Wage with the ID of ${req.params.id} does not exist or has already been removed from the database`
    })
  }
}

module.exports = {
  get_wages,
  get_wage,
  create_wage,
  update_wage,
  delete_wage
}