const taxCalc = (annual_income) => {
  // function calculates Nigerian annual tax only
  let tax;

  if (annual_income < 300000){
    tax = (annual_income / 100) * 1 // taxpayer pays 1% if they make below the annual minimum wage
  }else if (annual_income >= 300000 && annual_income < 500000){
    tax = (annual_income / 100) * 11 // not first year's tax
  }else if (annual_income >= 500000 && annual_income < 1600000){
    tax = (annual_income / 100) * 19 // not first year's tax
  }else if (annual_income >= 1600000 && annual_income < 3200000){
    tax = (annual_income / 100) * 21
  }else if (annual_income > 3200000){
    tax = (annual_income / 100) * 24
  }

  return tax;
}

module.exports = { taxCalc }