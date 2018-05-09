/**
 * The MeshGrouper handles analytics over a set of devices.
 * It can tell you how many disjoint local meshes there are,
 * and how big each one is.
 */
class MeshGrouper {

  constructor (devices, links) {
    this.localMeshes = []

    for (let device of devices) {
      let mesh = []
      mesh.push(device)

      for (let link of links) {
        if (link.contains(device)) {
          if (device === link.left) {
            mesh.push (link.right)
          } else {
            mesh.push (link.left)
          }
        }
      }

      this.localMeshes.push(mesh)
    }
  }

  get meshes () {
    return this.localMeshes
  }
}

export default MeshGrouper
