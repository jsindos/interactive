import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Header from './Header'
import Body from './Body'

import './styles.css'

class App extends Component {
  render () {
    return (
      <div id='wrapper'>
        <Header />
        <Body />
      </div>
    )
  }
}

const wrapper = document.getElementById('container')
ReactDOM.render(<App />, wrapper)
