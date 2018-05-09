import Link from './Link'
import Device, { CLAMP_BOUNCE } from './Device'

describe('A link', () => {
  test('can be created with all props', () => {
    let left = new Device(100, 100, CLAMP_BOUNCE)
    let right = new Device(100, 100, CLAMP_BOUNCE)
    let link = new Link(left, right, "type", 10, 11, 12)

    expect(link.left).toBe(left)
    expect(link.right).toBe(right)
    expect(link.type).toBe("type")
    expect(link.delay).toBe(10)
    expect(link.energy).toBe(11)
    expect(link.cost).toBe(12)
  })

  test('contains one device', () => {
    let left = new Device(100, 100, CLAMP_BOUNCE)
    let right = new Device(101, 100, CLAMP_BOUNCE)
    let link = new Link(left, right, "type", 10, 11, 12)

    expect(link.contains(left)).toBe(true)
    expect(link.contains(right)).toBe(true)
  })

  test('contains devices', () => {
    let left = new Device(100, 100, CLAMP_BOUNCE)
    let right = new Device(100, 100, CLAMP_BOUNCE)
    let link = new Link(left, right, "type", 10, 11, 12)

    expect(link.contains2(left, right)).toBe(true)
  })

  test('does not contain devices it does not know about', () => {
    let left = new Device(100, 100, CLAMP_BOUNCE)
    let centre = new Device(101, 102, CLAMP_BOUNCE)
    let right = new Device(103, 104, CLAMP_BOUNCE)
    let link = new Link(left, right, "type", 10, 11, 12)

    expect(link.contains2(left, centre)).toBe(false)
    expect(link.contains2(centre, right)).toBe(false)
    expect(link.contains2(centre, left)).toBe(false)
    expect(link.contains2(centre, right)).toBe(false)
  })

  test('contains devices in any order', () => {
    let left = new Device(100, 100, CLAMP_BOUNCE)
    let centre = new Device(101, 102, CLAMP_BOUNCE)
    let right = new Device(103, 104, CLAMP_BOUNCE)
    let link = new Link(left, right, "type", 10, 11, 12)

    expect(link.contains2(right, left)).toBe(true)
  })
})
