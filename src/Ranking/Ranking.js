import React from 'react'

import Questionnaire from './Questionnaire/Questionnaire'
import Line from './Line/Line'

import { ROWS } from '../utility/constants'

let state = ROWS.reduce((a, b) => ({ ...a, [b]: 30 }) , {})

const onChange = (type, v) => {
  state = {
    ...state,
    [type]: v
  }
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
        <Line />
      </div>
      <Questionnaire onChange={onChange} />
    </>
  )
}
