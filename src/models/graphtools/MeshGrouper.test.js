import Device from 'models/Device'
import EnergyLink from 'models/EnergyLink'
import MeshGrouper from 'graphtools/MeshGrouper'
import { generateDevices, setwiseEqual } from 'graphtools/DeviceGraph.test.util'

describe('A MeshGrouper', () => {
  test('can group a trivial set of nodes', () => {
    let devices = generateDevices(2)
    let link = new EnergyLink(devices[0], devices[1], "test_link", 13)

    let grouper = new MeshGrouper(devices, [link])

    expect (setwiseEqual (
      grouper.meshes[0],
      [devices[0], devices[1]]
    )).toBe(true)
  })
})