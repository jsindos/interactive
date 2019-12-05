import React from 'react'
import { Radar } from 'react-chartjs-2'

import usa from '/Users/josephtsindos/Downloads/MM_latest/USA-Table 1.csv'

import Colors from '../utility/Colors'
import { ROWS } from '../utility/constants'

const color = Colors.mapColorsToLabels(['USA'])

const data = usa.reduce((accum, entry) => {
  return ROWS.includes(entry['Country C']) ? {
    ...accum,
    [entry['Country C']]: entry['Maturity Mapping']
  } : accum
}, {})

export default () =>
  <Radar
    data={{
      labels: Object.keys(data),
      datasets: [{
        label: 'USA',
        data: Object.values(data),
        backgroundColor: `${color}66`,
        borderColor: color
      }]
    }}
    options={{
      scale: {
        ticks: {
          beginAtZero: true,
          max: 100
        }
      },
      title: {
        display: true,
        text: 'Maturity Mapping'
      }
    }}
  />
