import Device, { CLAMP_BOUNCE } from './Device'

describe('A mesh device', () => {
  test('can be created at a position with clamping', () => {
    const device = new Device(10, 11, CLAMP_BOUNCE)
    expect(device.x).toBe(10)
    expect(device.y).toBe(11)
    expect(device.dx).toBe(0)
    expect(device.dy).toBe(0)
    expect(device.clamp).toBe(CLAMP_BOUNCE)
  })
  test('can be moved by hand', () => {
    const device = new Device(5, 6, CLAMP_BOUNCE)
    expect(device.x).toBe(5)
    expect(device.y).toBe(6)
    device.x = 10
    expect(device.x).toBe(10)
    device.y = 11
    expect(device.y).toBe(11)
  })
  test('can be primed for movement without being moved', () => {
    const device = new Device(100, 100, CLAMP_BOUNCE)
    expect(device.x).toBe(100)
    expect(device.y).toBe(100)
    device.dx = 20
    device.dy = 21
    expect(device.x).toBe(100)
    expect(device.y).toBe(100)
  })
  test('can have a radio', () => {
    const device = new Device(100, 100, CLAMP_BOUNCE)
    device.addRadio("test radio", 50)
    expect(device.enabled("test radio"))
  })
  test('can disable and enable a radio', () => {
    const device = new Device(10, 10, CLAMP_BOUNCE)
    device.addRadio("test radio", 10)
    expect(device.enabled("test radio"))
    device.disableRadio("test radio")
    expect(device.enabled("test radio")).toBe(false)
    device.enableRadio("test radio")
    expect(device.enabled("test radio"))
  })
  test('can have a radio with set range', () => {
    const device = new Device(10, 10, CLAMP_BOUNCE)
    device.addRadio("test radio", 50)
    expect(device.range("test radio")).toBe(50)
  })
  test('can set a radio mode', () => {
    const device = new Device(1, 2, CLAMP_BOUNCE)
    device.addRadio("test radio", 50)
    device.radioMode("test radio", "test mode")
    expect(device.is("test radio", "test mode"))
  })
  test('can be clamped', () => {
    const device = new Device(300, 300, CLAMP_BOUNCE)
    device.x = 501
    device.y = -10
    expect(device.x).toBe(500)
    expect(device.y).toBe(0)
  })
})
