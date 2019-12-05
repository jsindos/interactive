import React from 'react'
import { Line } from 'react-chartjs-2'

import Colors from '../../utility/Colors'

import csv from './world-forecast.csv'

const dataTransform = (data) => {
  const numberOfDataPoints = Object.entries(data[0]).length - 1
  const labels = Array.apply(null, Array(numberOfDataPoints))
    .map((_, i) => `Score ${ordinalSuffixOf(i + 1)} Year`)
  const datasets = data.reduce((accum, country, index) => {
    const color = Colors.mapColorsToLabels([country['Country Name']])[0]
    return accum.concat({
      label: country['Country Name'],
      data: labels.map(o => country[o]),
      fill: false,
      lineTension: 0.1,
      // backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: color,
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      // pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      // pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      // pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10
    })
  }, [])
  return { datasets, labels }
}

function ordinalSuffixOf (i) {
  var j = i % 10
  var k = i % 100
  if (j === 1 && k !== 11) {
    return i + 'st'
  }
  if (j === 2 && k !== 12) {
    return i + 'nd'
  }
  if (j === 3 && k !== 13) {
    return i + 'rd'
  }
  return i + 'th'
}

export default ({userCountry}) => {
  const data = dataTransform(csv.concat([userCountry]))
  return (
    <Line
      data={data}
      options={{
        title: {
          display: true,
          text: 'Overall World AI Relative Ranking Forecast'
        }
      }}
    />
  )
}
