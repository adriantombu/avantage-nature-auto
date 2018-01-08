const autoTypeNodes = document.getElementsByName('autoType[]')
const fuelTypeNodes = document.getElementsByName('fuelType[]')
const priceNode = document.getElementById('price')
const insuranceNode = document.getElementById('insurance')
const servicingeNode = document.getElementById('servicing')
const fueleNode = document.getElementById('fuel')
const mileageNode = document.getElementById('mileage')
const personalMileageNode = document.getElementById('personal_mileage')
const flatRateNode = document.getElementById('flat_rate')
const flatRateMonthNode = document.getElementById('flat_rate_month')
const flatRatFormulahNode = document.getElementById('flat_rate_formula')
const realExpenseshNode = document.getElementById('real_expenses')
const realExpensesMonthhNode = document.getElementById('real_expenses_month')
const realExpensesFormulahNode = document.getElementById(
  'real_expenses_formula'
)

// Initialize values
let autoType = document.querySelector('input[name="autoType[]"]:checked').value
let fuelType = document.querySelector('input[name="fuelType[]"]:checked').value
let price = parseInt(priceNode.value, 10)
let insurance = parseInt(insuranceNode.value, 10)
let servicing = parseInt(servicingeNode.value, 10)
let fuel = parseInt(fueleNode.value, 10)
let mileage = parseInt(mileageNode.value, 10)
let personalMileage = parseInt(personalMileageNode.value, 10)

calculate()

// Initialize listeners
Array.from(autoTypeNodes).map(node => {
  node.addEventListener('change', function (evt) {
    autoType = evt.target.value

    const priceName = document.getElementById('price_name')
    priceName.innerHTML = autoType === 'leasing'
      ? 'Frais de location annuels'
      : "Prix d'achat"

    calculate()
  })
})

Array.from(fuelTypeNodes).map(node => {
  node.addEventListener('change', function (evt) {
    fuelType = evt.target.value
    calculate()
  })
})

priceNode.addEventListener('change', function (evt) {
  price = parseInt(evt.target.value, 10)
  calculate()
})

insuranceNode.addEventListener('change', function (evt) {
  insurance = parseInt(evt.target.value, 10)
  calculate()
})

servicingeNode.addEventListener('change', function (evt) {
  servicing = parseInt(evt.target.value, 10)
  calculate()
})

fueleNode.addEventListener('change', function (evt) {
  fuel = parseInt(evt.target.value, 10)
  calculate()
})

mileageNode.addEventListener('change', function (evt) {
  mileage = parseInt(evt.target.value, 10)
  calculate()
})

personalMileageNode.addEventListener('change', function (evt) {
  personalMileage = parseInt(evt.target.value, 10)
  calculate()
})

// Calculations
function calculate () {
  console.log({
    autoType,
    fuelType,
    price,
    insurance,
    servicing,
    mileage,
    personalMileage
  })

  let flatRate = 0

  switch (autoType) {
    case 'bought_new':
      flatRate = fuelType === 'fuel_employee'
        ? price / 100 * 9
        : price / 100 * 12
      break

    case 'bought_old':
      flatRate = fuelType === 'fuel_employee'
        ? price / 100 * 6
        : price / 100 * 9
      break

    case 'leasing':
      flatRate = fuelType === 'fuel_employee'
        ? price / 100 * 30
        : price / 100 * 40
      break
  }

  const realExpenses = calculateRealExpenses()
  showFormulas()

  flatRateNode.innerHTML = parseInt(flatRate, 10)
  flatRateMonthNode.innerHTML = parseInt(flatRate / 12, 10)
  realExpenseshNode.innerHTML = parseInt(realExpenses, 10)
  realExpensesMonthhNode.innerHTML = parseInt(realExpenses / 12, 10)
}

function calculateRealExpenses () {
  let depreciation, charges

  switch (autoType) {
    case 'bought_new':
      depreciation = price / 100 * 20
      charges = depreciation + insurance + servicing
      break

    case 'bought_old':
      depreciation = price / 100 * 10
      charges = depreciation + insurance + servicing
      break

    case 'leasing':
      charges = price + insurance + servicing
      break
  }

  const fares = charges * personalMileage / mileage
  const totalFuel = fuel * personalMileage / mileage

  return fares + totalFuel
}

function showFormulas () {
  let flatRateFormula, realExpenseFormula

  switch (autoType) {
    case 'bought_new':
      flatRateFormula = fuelType === 'fuel_employee'
        ? "9 % du prix du véhicule TTC payé par l'entreprise"
        : "12 % du prix du véhicule TTC payé par l'entreprise"

      realExpenseFormula =
        '(amortissements 20 % + assurance + entretien) x km privés / nombre total de km + frais réels de carburant payés par l’entreprise'
      break

    case 'bought_old':
      flatRateFormula = fuelType === 'fuel_employee'
        ? "6 % du prix du véhicule TTC payé par l'entreprise"
        : "9 % du prix du véhicule TTC payé par l'entreprise"

      realExpenseFormula =
        '(amortissements 10 % + assurance + entretien) x km privés / nombre total de km + frais réels de carburant payés par l’entreprise'
      break

    case 'leasing':
      flatRateFormula = fuelType === 'fuel_employee'
        ? '30 % du coût annuel TTC pour l’entreprise (frais de location, d’assurance et d’entretien.)'
        : '40 % du coût annuel TTC pour l’entreprise (frais de location, d’assurance et d’entretien.)'

      realExpenseFormula =
        '(coût annuel de la location + assurance + entretien) x km privés / nombre total de km + frais réels de carburant payés par l’entreprise'
      break
  }

  flatRatFormulahNode.innerHTML = flatRateFormula
  realExpensesFormulahNode.innerHTML = realExpenseFormula
}
