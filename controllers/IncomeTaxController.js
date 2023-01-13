const calc_income_tax = (req, res) => {
  if (!req.user) {
    logger.info('token is missing')
    return res.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const annual_income = req.body.annual_income // number
  const first_year= req.body.first_year // boolean
}