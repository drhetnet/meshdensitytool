/**
* Store connection info of a link between two devices.
* There is no distinction between the two devices.
*/
class Link {
  constructor (left, right, type, delay, energy, cost) {
    this.left = left
    this.right = right
    this.type = type
    this.delay = delay
    this.energy = energy
    this.cost = cost
  }

  /**
   * Determine if a link contains the device.
   */
  contains (device) {
    if (this.left === device ||
        this.right === device) {
      return true
    }
    return false
  }

  /**
   * Determine if a link contains the two devices.
   * Order does not matter.
   */
  contains2 (left, right) {
    let doesContainBoth = false
    if ((this.left === left && this.right === right) ||
        (this.right === left && this.left === right)) {
      doesContainBoth = true
    }
    return doesContainBoth
  }
}

export default Link
