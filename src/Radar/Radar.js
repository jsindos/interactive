import React from 'react'
import { Radar } from 'react-chartjs-2'

import Colors from '../utility/Colors'

import usa from './data/usa.csv'

const rows = [
  'Strategy',
  'Policy',
  'Funding',
  'Tech Capacity',
  'Tech Innovation',
  'Skills'
]

const color = Colors.mapColorsToLabels(['USA'])

const data = usa.reduce((accum, entry) => {
  return rows.includes(entry['Country C']) ? {
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
