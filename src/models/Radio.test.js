import Radio from './Radio'

describe('A radio', () => {
  test('can be created with default state and range', () => {
    const radio = new Radio(false, 10)
    expect(radio.enabled).toBe(false)
    expect(radio.range).toBe(10)
  })
  test('can be enabled', () => {
    const radio = new Radio(false, 5)
    expect(radio.enabled).toBe(false)
    radio.enable()
    expect(radio.enabled).toBe(true)
  })
  test('can be disabled', () => {
    const radio = new Radio(true, 5)
    expect(radio.enabled).toBe(true)
    radio.disable()
    expect(radio.enabled).toBe(false)
  })
})