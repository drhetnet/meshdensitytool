import React from 'react'

class SimulationParameter extends React.Component {
  render () {
    return (
      <div className="SimulationParameter param-grid-container">
        <label>{this.props.label}</label>
        <input id={this.props.id} type="text" value={this.props.value} onChange={(event) => this.props.onChange(event)} />
      </div>
    )
  }
}

export default SimulationParameter
