import Link from './Link'

class LinkHint extends Link {
  constructor () {
    super(null, null, null, null, null, null)
    this._leftSet = false
    this._rightSet = false
    this._typeSet = false
  }

  /**
   * Add a device to the hint object.
   * @param {Device} device
   */
  addDevice (device) {
    if (!this._leftSet) {
      this.left = device
      this._leftSet = true
    } else if (!this._rightSet) {
      this._rightSet = true
      this.right = device
    }

    return this
  }

  /**
   * Add a type to the hint object.
   * @param {string} type
   */
  addType (type) {
    if (!this._typeSet) {
      this._typeSet = true
      this.type = type
    }

    return this
  }

  build () {
    return new Link(this.left, this.right, this.type, this.delay, this.energy, this.cost)
  }

}

export default LinkHint
