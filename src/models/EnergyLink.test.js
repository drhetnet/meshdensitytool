import EnergyLink from './EnergyLink'
import Device, { CLAMP_BOUNCE } from './Device';

describe('EnergyLink', () => {
  test('can be created with two devices, a type, and an energy', () => {
    let left = new Device(100, 100, CLAMP_BOUNCE)
    let right = new Device(100, 100, CLAMP_BOUNCE)
    let elink = new EnergyLink(left, right, "type", 55)

    expect(elink.left).toBe(left)
    expect(elink.right).toBe(right)
    expect(elink.type).toBe("type")
    expect(elink.delay).toBe(0)
    expect(elink.energy).toBe(55)
    expect(elink.cost).toBe(0)
  })
})