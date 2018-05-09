import Device, { CLAMP_BOUNCE } from 'models/Device'

export function generateDevices(count) {
  let devices = [];
  for (let i = 0; i < count; i++) {
    devices.push(new Device(i, 100 + i, CLAMP_BOUNCE));
  }
  return devices;
}

export function setwiseEqual (listLeft, listRight) {
  if (listLeft.length != listRight.length) {
    return false
  }

  for (let element of listLeft) {
    if (listRight.indexOf(element) == -1) {
      return false
    }
  }

  return true
}
