const Wage = require('../models/Wage')
const { taxCalc } = require('../helpers/taxCacl')
const logger = require('../utils/logger')

const calc_income_tax = async (req, res) => {
  if (!req.user) {
    logger.info('token is missing')
    return res.status(401).json({
      error: 'token missing or invalid'
    })
  }

  // annual_income and first_year values are optional. That is, the front end can choose to include it or not
  // If no annual income is provided, this controller returns the tax amount for Nigerira's annual minimum wage
  // This controller also checks if the taxpayer is a first timer and generates the appropriate tax amount

  const annual_income = req.body.annual_income // data_type: number && value is optional
  const first_year= req.body.first_year // data_type: boolean && value is optional

  if(!annual_income && first_year){
    // calculates first year's tax for Nigeria's minimum wage since annual income is not provided
    try{
      const ng = await Wage.findOne({ name: 'ng' })
      
      if(!ng){
        logger.info('Unexpected event! Minimum wage missing')

        return res.status(404).json({
          success: false,
          message: "Unexpected! Minimum wage value for nigeria is missing from the database"
        })
      }

      const tax = (ng.minimum_wage / 100) * 7

      res.status(200).json({
        annual_minimum_wage: 300000,
        annual_income: "not given",
        first_year: true,
        tax,
        description: "Nigerian annual minimum wage tax amount"
      })
    }catch(error){
      logger.error('Failed to retrieve result', error)

      return res.status(400).json({
        success: false,
        message: "Failed to fetch annual income tax"
      })
    }
  }else if(!annual_income && !first_year){
    // calculates tax if annual income is not provided and if taxpayer is not a first timer
    try{
      const tax = taxCalc(300000) 

      res.status(200).json({
        annual_minimum_wage: 300000,
        annual_income: "not given",
        first_year: false,
        tax,
        description: "Nigerian annual minimum wage tax amount"
      })
    }catch(error){
      logger.error('Failed to retrieve result', error)

      return res.status(400).json({
        success: false,
        message: "Failed to fetch annual income tax"
      })
    }
  }else if((annual_income >= 500000 && annual_income < 1600000) && first_year){
    // calculates first year's tax for persons with annual income of 500000 and above but not up to 1600000
    try{
      const ng = await Wage.findOne({ name: 'ng' })
      
      if(!ng){
        logger.info('Unexpected event! Minimum wage missing')

        return res.status(404).json({
          success: false,
          message: "Unexpected! Minimum wage value for nigeria is missing from the database"
        })
      }

      const tax = (ng.minimum_wage / 100) * 15

      res.status(200).json({
        annual_minimum_wage: 300000,
        annual_income,
        first_year: true,
        tax,
        description: "Taxpayer's annual income tax"
      })
    }catch(error){
      logger.error('Failed to retrieve result', error)

      return res.status(400).json({
        success: false,
        message: "Failed to fetch annual income tax"
      })
    }
  }else{
    try{
      const tax = taxCalc(annual_income) 

      res.status(200).json({
        annual_minimum_wage: 300000,
        annual_income,
        first_year: false,
        tax,
        description: "Taxpayer's annual income tax"
      })
    }catch(error){
      logger.error('Failed to retrieve result', error)

      return res.status(400).json({
        success: false,
        message: "Failed to fetch annual income tax"
      })
    }
  }
}

module.exports = { calc_income_tax }