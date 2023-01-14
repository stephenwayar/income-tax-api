const { taxCalc } = require('../../helpers/taxCacl')

// Run tests individually. use test.only()

describe('Income tax calculator', () => {
  test('individual who earns below minimum wage', () => {
    const annual_income = 200000
    const tax = taxCalc(annual_income)

    expect(tax).toBeLessThan(21000)
  })

  test('regular individual who earns above minimum wage but below 500000', () => {
    const annual_income = 400000
    const tax = taxCalc(annual_income)

    expect(tax).toBeGreaterThanOrEqual(21000);
    expect(tax).toBeLessThan(54999.89);
  })

  test('regular individual who earns 500000 and above but not above 1600000', () => {
    const annual_income = 550000
    const tax = taxCalc(annual_income)

    expect(tax).toBeGreaterThanOrEqual(95000);
    expect(tax).toBeLessThan(303999.81);
  })

  test('regular individual who earns 1600000 and above but not above 3200000', () => {
    const annual_income = 1800000
    const tax = taxCalc(annual_income)

    expect(tax).toBeGreaterThanOrEqual(336000);
    expect(tax).toBeLessThan(671999.79);
  })

  test('regular individual who earns 3200000 and above', () => {
    const annual_income = 4000000
    const tax = taxCalc(annual_income)

    expect(tax).toBeGreaterThanOrEqual(768000);
  })
})