import React from 'react'

import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'

import { MAX_VALUES } from '../../utility/constants'

export default ({ onChange }) => {
  return (
    <>
      {
        Object.entries(MAX_VALUES).map(([type, MAX_VALUE], i) => {
          return (
            <div key={i}>
              <Typography id='discrete-slider' gutterBottom>
                {type}
              </Typography>
              <Slider
                onChangeCommitted={(_, v) => onChange(type, v)}
                defaultValue={30}
                aria-labelledby='discrete-slider'
                valueLabelDisplay='auto'
                step={10}
                marks
                min={0}
                max={MAX_VALUE}
              />
            </div>
          )
        })
      }

    </>
  )
}
