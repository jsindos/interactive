import australia from '/Users/josephtsindos/Downloads/MM_latest/Australia-Table 1.csv'
import formula from '/Users/josephtsindos/Downloads/MM_latest/Success World-Table 1.csv'

import { FORMULA_ROWS, FORMULA_COLUMNS, ROWS, NEGATIVE_IMPACT_ROWS, POSITIVE_IMPACT_ROWS } from '../utility/constants'

const findFormulaRow = (rowName) => formula.find(f => f.Factors === rowName)

const getFormulaValuesAsArray = row =>
  FORMULA_COLUMNS.map(c =>
    Object.entries(row).find(([ key ]) => key === c)[1]
  )

const data = australia.reduce((accum, entry) => {
  return ROWS.includes(entry['Country C']) ? {
    ...accum,
    [entry['Country C']]: entry['Maturity Mapping']
  } : accum
}, {})

let [ negativeImpacts, positiveImpacts ] = australia.filter(r => r['Country C'] === 'Total')

negativeImpacts = {
  large: negativeImpacts['Maturity Mapping'],
  medium: negativeImpacts['Medium Impact'],
  small: negativeImpacts['Small Impact']
}

positiveImpacts = {
  large: positiveImpacts['Maturity Mapping'],
  medium: positiveImpacts['Medium Impact'],
  small: positiveImpacts['Small Impact']
}

const countryScores = Object.entries(FORMULA_ROWS).map(([ formulaRowName, dataRowName ]) => {
  const row = findFormulaRow(formulaRowName)
  const formulaValues = getFormulaValuesAsArray(row)
  const calculatedValues = formulaValues.map(v => v * data[dataRowName])
  // console.log({
  //   type: dataRowName,
  //   values: calculatedValues
  // })
  return calculatedValues
})
// Sum all values together
.reduce((accum, current) => current.map((num, i) => num + accum[i]))

const negativeImpactsCalculated = NEGATIVE_IMPACT_ROWS.map(r => {
  const row = findFormulaRow(r)
  const formulaValues = getFormulaValuesAsArray(row)
  const impactValue = r.includes('Small') ? negativeImpacts['small'] :
    r.includes('Medium') ? negativeImpacts['medium'] :
    r.includes('Large')  && negativeImpacts['large']
  return formulaValues.map(v => 1 - v).map(v => v * impactValue)
})
// Sum all values together
.reduce((a, b) => b.map((num, i) => num + a[i]))
// Subtract into 1
.map(v => 1 - v)

const positiveImpactsCalculated = POSITIVE_IMPACT_ROWS.map(r => {
  const row = findFormulaRow(r)
  const formulaValues = getFormulaValuesAsArray(row)
  const impactValue = r.includes('Small') ? positiveImpacts['small'] :
    r.includes('Medium') ? positiveImpacts['medium'] :
    r.includes('Large')  && positiveImpacts['large']
  return formulaValues.map(v => v * impactValue)
})
// Sum all values together
.reduce((a, b) => b.map((num, i) => num + a[i]))
// Subtract off raw positive impact totals
.map(v => v - Object.values(positiveImpacts).reduce((a, b) => a + b, 0))

const finalScores = countryScores
// Multiply by negative factors
.map((s, i) => s * negativeImpactsCalculated[i])
// Add positive factors
.map((v, i) => v + positiveImpactsCalculated[i])
