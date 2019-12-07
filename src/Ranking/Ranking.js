import React from 'react'

import Questionnaire from './Questionnaire/Questionnaire'
import Line from './Line/Line'

import { ROWS, FORMULA_COLUMNS } from '../utility/constants'

import { calculateScoresFromBaselines } from './calculateRanking'

export default class Ranking extends React.Component {
  constructor (props) {
    super(props)
    this.state = { baselines: ROWS.reduce((a, b) => ({ ...a, [b]: 30 }), {}) }
  }

  onChange (type, v) {
    this.setState({
      baselines: {
        ...this.state.baselines,
        [type]: v
      }
    })
  }

  render () {
    const scores = calculateScoresFromBaselines(this.state.baselines)
    const formattedState = {
      'Country Name': 'Utopia',
      ...FORMULA_COLUMNS.reduce((a, b, i) => ({ ...a, [`Score ${b}`]: scores[i] }), {}),
      options: {
        borderWidth: 3,
        borderDash: [15, 3, 3, 3],
        borderCapStyle: 'butt',
        borderJoinStyle: 'miter',
        borderDashOffset: 1,
        pointRadius: 1
      }
    }
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
        <Questionnaire onChange={this.onChange.bind(this)} />
      </>
    )
  }
}
