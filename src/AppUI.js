import React from 'react'

import YAML from 'yamljs'
import $ from 'jquery'

import Simulator from './Simulator'
import SimulationParameter from './views/SimulationParameter'

class AppUI extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      density: 50,
      wifiHotspotPercentage: 15,
      wifiHotspotRange: 35,
      wifiDirectHotspotPercentage: 8,
      wifiDirectHotspotRange: 35,
      bluetoothPercentage: 80,
      bluetoothRange: 5,
      internetSharerPercentage: 3,
      wifiPowerLevel: 10,
      wifiDirectPowerLevel: 10,
      bluetoothPowerLevel: 10,
      cellPowerLevel: 10,
      runs: 1,
      seed: 9679234,
      enabled: false,
    }
  }

  regenerate () {
    this.sim.generate(
      500,
      500,
      this.state.density,
      this.state.wifiHotspotPercentage,
      this.state.wifiHotspotRange / 2.0,
      this.state.wifiDirectHotspotPercentage,
      this.state.wifiDirectHotspotRange / 2.0,
      this.state.bluetoothPercentage,
      this.state.bluetoothRange / 2.0,
      this.state.wifiPowerLevel,
      this.state.wifiDirectPowerLevel,
      this.state.bluetoothPowerLevel,
      this.state.cellPowerLevel,
      this.state.internetSharerPercentage,
    )
    this.sim.run(false)
    this.sim.makeHistory()
  }

  multi () {
    for (let i = 0; i < this.state.runs; i++) {
      this.regenerate()
    }
  }

  handleGenerateClick () {
    this.setState({density: $('#density').val()})
    this.multi()
  }

  handleStepClick () {
    this.sim.run(false)
  }

  handleRunClick () {
    this.sim.run(true)
  }

  handlePauseClick () {
    this.sim.pause()
  }

  handleCreateSimClick () {
    delete this.sim
    let canvas = document.getElementById('canvas')
    this.sim = new Simulator(canvas.getContext('2d'), this.state.seed)
    this.regenerate()
    this.setState({enabled: true})
  }

  handleParamChange (event) {
    this.setState({[event.target.id]: event.target.value})
    this.setState({enabled: false})
  }

  handleRunsChange (event) {
    this.setState({
      runs: event.target.value
    })
  }

  handleConfLoad (event) {
    let nativeObject = YAML.parse(event.target.result)
    const meshconf = nativeObject.meshdensitytool
    this.setState({
      density: meshconf.devices.density,
      wifiHotspotPercentage: meshconf.devices.wifi.hotspotPercentage,
      wifiHotspotRange: meshconf.devices.wifi.hotspotRange,
      wifiDirectHotspotPercentage: meshconf.devices.wifiDirect.hotspotPercentage,
      wifiDirectHotspotRange: meshconf.devices.wifiDirect.hotspotRange,
      bluetoothPercentage: meshconf.devices.bluetooth.percentage,
      bluetoothRange: meshconf.devices.bluetooth.range,
      internetSharerPercentage: meshconf.devices.internet.sharerPercentage,
    })
  }

  handleRegionClick (region) {
    let density = 0
    switch (region) {
      case "canada":
        density = 4
        break
      case "guatcity":
        density = 1000
        break
      case "toronto":
        density = 2650
        break
      case "vancouver":
        density = 5249
        break
    }

    this.setState({
      density: density
    })
  }

  // ref: https://stackoverflow.com/questions/750032/reading-file-contents-on-the-client-side-in-javascript-in-various-browsers
  updateConf () {
    // Config file loading
    var confInput = document.getElementById('conf')
    var curFiles = confInput.files
    var conf = curFiles[0]
    var reader = new FileReader()
    reader.readAsText(conf, 'UTF-8')
    reader.onload = (event) => this.handleConfLoad(event)
    reader.onerror = function (evt) {
      document.getElementById('fileContents').innerHTML = 'error reading file'
    }
  }

  render () {
    return (
      <div className="app-ui-wrapper">
        <div className="app-ui-init-controls">
          <SimulationParameter
            label="Seed:"
            id="seed"
            value={this.state.seed}
            onChange={(event) => this.handleParamChange(event)}
          />

          <div className="app-ui-input-group">
            <SimulationParameter
              label="Population density [devices / km^2]:"
              id="density"
              value={this.state.density}
              onChange={(event) => this.handleParamChange(event)}
            />
            <button
              onClick={() => this.handleRegionClick("canada")}
              className="location-btn"
            >
              Canada
            </button>
            <button
              onClick={() => this.handleRegionClick("guatcity")}
              className="location-btn"
            >
              Guatemala City
            </button>
            <button
              onClick={() => this.handleRegionClick("toronto")}
              className="location-btn"
            >
              Vancouver
            </button>
            <button
              onClick={() => this.handleRegionClick("vancouver")}
              className="location-btn"
            >
              Toronto
            </button>
          </div>

          <div className="app-ui-input-group">
            <SimulationParameter
              label="Wifi hotspot %:"
              id="wifiHotspotPercentage"
              value={this.state.wifiHotspotPercentage}
              onChange={(event) => this.handleParamChange(event)}
            />
            <SimulationParameter
              label="Wifi hotspot range [m]:"
              id="wifiHotspotRange"
              value={this.state.wifiHotspotRange}
              onChange={(event) => this.handleParamChange(event)}
            />
          </div>
          <div className="app-ui-input-group">
            <SimulationParameter
              label="Wifi-direct hotspot %:"
              id="wifiDirectHotspotPercentage"
              value={this.state.wifiDirectHotspotPercentage}
              onChange={(event) => this.handleParamChange(event)}
            />
            <SimulationParameter
              label="Wifi-direct hotspot range [m]:"
              id="wifiDirectHotspotRange"
              value={this.state.wifiDirectHotspotRange}
              onChange={(event) => this.handleParamChange(event)}
            />
          </div>
          <div className="app-ui-input-group">
            <SimulationParameter
              label="Bluetooth %:"
              id="bluetoothPercentage"
              value={this.state.bluetoothPercentage}
              onChange={(event) => this.handleParamChange(event)}
            />
            <SimulationParameter
              label="Bluetooth range [m]:"
              id="bluetoothRange"
              value={this.state.bluetoothRange}
              onChange={(event) => this.handleParamChange(event)}
            />
          </div>
          <div className="app-ui-input-group">
            <SimulationParameter
              label="Wifi power level:"
              id="wifiPowerLevel"
              value={this.state.wifiPowerLevel}
              onChange={(event) => this.handleParamChange(event)}
            />
            <SimulationParameter
              label="Wifi-direct power level:"
              id="wifiDirectPowerLevel"
              value={this.state.wifiDirectPowerLevel}
              onChange={(event) => this.handleParamChange(event)}
            />
            <SimulationParameter
              label="Bluetooth power level:"
              id="bluetoothPowerLevel"
              value={this.state.bluetoothPowerLevel}
              onChange={(event) => this.handleParamChange(event)}
            />
            <SimulationParameter
              label="Cell energy level:"
              id="cellPowerLevel"
              value={this.state.cellPowerLevel}
              onChange={(event) => this.handleParamChange(event)}
            />
          </div>
          <SimulationParameter
            label="Percentage of internet-sharers:"
            id="internetSharerPercentage"
            value={this.state.internetSharerPercentage}
            onChange={(event) => this.handleParamChange(event)}
          />
          <button onClick={() => this.handleCreateSimClick()}
            id="create_btn" className="control-btn">Create Sim</button>
        </div>
        <div className="app-ui-inputs">
          <br />
          <SimulationParameter
            label="Number of runs"
            id="runs"
            value={this.state.runs}
            onChange={(event) => this.handleRunsChange(event)}
          />

          <label>Config </label>
          <br/>
          <input id="conf" type="file" onChange={() => this.updateConf()} />
          <br/>
          <div id="fileContents">Contents</div>

          <button
            onClick={() => this.handleGenerateClick()}
            id="generate_btn"
            className="control-btn"
            disabled={!this.state.enabled}
          >
            Generate
          </button>
          <button
            onClick={() => this.handleStepClick()}
            id="step"
            className="control-btn"
            disabled={!this.state.enabled}
          >
            Step
          </button>
          <button
            onClick={() => this.handleRunClick()}
            id="animate"
            className="control-btn"
            disabled={!this.state.enabled}
          >
            Animate!
          </button>
          <button
            onClick={() => this.handlePauseClick()}
            id="pause"
            className="control-btn"
            disabled={!this.state.enabled}
          >
            Pause
          </button>
        </div>
      </div>
    )
  }
}

export default AppUI
