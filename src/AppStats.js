import React from 'react'

class StatOutput extends React.Component {
  render () {
    return (
      <div className="StatOutput">
        <div>{this.props.id}</div>
        <div id={this.props.id}></div>
      </div>
    )
  }
}

class AppStats extends React.Component {
  render () {
    return (
      <div>
        <StatOutput id="stat-density" />
        <StatOutput id="stat-wifi-hotspot-percent" />
        <StatOutput id="stat-wifi-hotspot-range" />
        <StatOutput id="stat-wifi-hotspot-coverage" />
        <StatOutput id="stat-wifi-average-hotspots" />
        <StatOutput id="stat-wifi-average-clients" />
        <StatOutput id="stat-total-energy" />
        <StatOutput id="stat-unconnected" />
        <StatOutput id="stat-largest-local" />
      </div>
    )
  }
}

export default AppStats
