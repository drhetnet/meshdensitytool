class Radio {
  constructor (defaultState, range) {
    this._enabled = defaultState
    this._range = range
  }

  enable () {
    this._enabled = true
  }

  disable () {
    this._enabled = false
  }

  get enabled () {
    return this._enabled
  }

  get range () {
    return this._range
  }
}

export default Radio
