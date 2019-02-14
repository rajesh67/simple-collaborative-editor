import React, { Component } from 'react'

import Editor from './Editor'
import Welcome from "./Welcome";

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Welcome />
        <Editor />
      </div>
    )
  }
}
