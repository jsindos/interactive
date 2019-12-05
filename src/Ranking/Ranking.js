import React from 'react'

import Questionnaire from './Questionnaire/Questionnaire'
import Line from './Line/Line'

import { ROWS, FORMULA_COLUMNS } from '../utility/constants'

import { calculateScoresFromBaselines } from './calculateRanking'

let state = ROWS.reduce((a, b) => ({ ...a, [b]: 30 }) , {})
let scores = calculateScoresFromBaselines(state)
let formattedState = {
  'Country Name': 'Utopia',
  ...FORMULA_COLUMNS.reduce((a, b, i) => ({ ...a, [`Score ${b}`]: scores[i] }), {})
}

const onChange = (type, v) => {
  state = {
    ...state,
    [type]: v
  }
  scores = calculateScoresFromBaselines(state)
  formattedState = {
    'Country Name': 'Utopia',
    ...FORMULA_COLUMNS.reduce((a, b, i) => ({ ...a, [`Score ${b}`]: scores[i] }), {})
  }
  console.log(formattedState)
}

export default () => {
  return (
    <>
      <div style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: '800px'
        // textAlign: 'center'
      }}
      >
        <Line userCountry={formattedState} />
      </div>
      <Questionnaire onChange={onChange} />
    </>
  )
}
