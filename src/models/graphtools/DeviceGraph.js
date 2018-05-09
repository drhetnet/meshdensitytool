/**
 * The DeviceGraph is a set of utility functions for manipulating a set of devices
 * and links between them.
 */

class DeviceGraph {
  /**
   * Generate a new graph, containing the given devices.
   * @param {array} devices Optional : A list of devices to add to the graph.
   */
  constructor (devices = []) {
    this._devices = devices
    this._links = []
  }

  /**
   * Add a device to the graph.
   * @param {Device} device
   */
  addDevice (device) {
    this._devices.push(device)
  }

  /**
   * Remove a device from the graph.
   * @param {Device} device
   */
  removeDevice (device) {
    this._devices.splice(this._devices.indexOf(device), 1)
  }

  /**
   * Add a link between devices.
   * @param {Link} link
   */
  addLink (link) {
    this._links.push(link)
  }

  /**
   * Remove all links matching the given properties.
   * @param {Link} hint A collection of properties to search for.
   */
  unlink (hint) {
    let deletables = []
    for (let link of this._links) {
      if (link.contains2(hint.left, hint.right)) {
        if ((hint.type !== null) &&
            (hint.type !== link.type)) {
          break
        }
        deletables.push(link)
      }
    }

    for (let deletable of deletables) {
      this._links.splice(this._links.indexOf(deletable), 1)
    }
  }

  /**
   * Check if two devices are connected.
   * There is no distinction between the first and second arguments.
   * @param {Device} left
   * @param {Device} right
   */
  isLinked (left, right) {
    for (let link of this._links) {
      if (link.contains2(left, right)) {
        return true
      }
    }

    return false
  }

  /**
   * Return all the devices known to the graph,
   * in no particular order.
   */
  get devices () {
    return this._devices
  }

  /**
   * Get the set of elements connected in a 'local mesh'
   * to the given device.
   * @param {Device} device A device in the graph.
   * @returns {list} the set of elements connected to given element.
   */
  localMesh (device) {
    let mesh = []
    mesh.push(device)

    for (let link of this._links) {
      if (link.contains(device)) {
        if (device === link.left) {
          mesh.push (link.right)
        } else {
          mesh.push (link.left)
        }
      }
    }

    return mesh
  }
}

export default DeviceGraph
