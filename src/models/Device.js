import Radio from './Radio'

export const CLAMP_BOUNCE = "CLAMP_BOUNCE"

class Device {
  constructor (x, y, clamp) {
    this.radios = {}
    this.modes = {}
    this.moveTo(x, y)
    this._dx = 0
    this._dy = 0
    this.clamp = clamp
  }

  moveTo (x, y) {
    this._x = x
    this._y = y
  }

  addRadio (name, range) {
    this.radios[name] = new Radio(true, range)
  }

  radioMode (name, mode) {
    this.modes[name] = mode
  }

  is (name, mode) {
    if (this.modes[name] === mode) {
      return true
    }
    return false
  }

  range (name) {
    return this.radios[name].range
  }

  enableRadio (name) {
    this.radios[name].enable()
  }
  disableRadio (name) {
    this.radios[name].disable()
  }
  enabled (name) {
    return this.radios[name].enabled
  }

  get x () {
    return this._x
  }
  set x (pos) {
    this._x = pos
    switch (this.clamp) {
      case CLAMP_BOUNCE:
        if (this._x < 0) {
          this._x = 0
          this._dx *= -1
        }
        if (this._x > 500) {
          this._x = 500
          this._dx *= -1
        }
        break
      default:
        break
    }
  }

  get y () {
    return this._y
  }
  set y (pos) {
    this._y = pos
    switch (this.clamp) {
      case CLAMP_BOUNCE:
        if (this._y < 0) {
          this._y = 0
          this._dy *= -1
        }
        if (this._y > 500) {
          this._y = 500
          this._dy *= -1
        }
        break
      default:
        break
    }
  }

  get dx () {
    return this._dx
  }
  set dx (val) {
    this._dx = val
  }

  get dy () {
    return this._dy
  }
  set dy (val) {
    this._dy = val
  }
}

export default Device
