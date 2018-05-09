import Link from './Link'

class EnergyLink extends Link {
  constructor (left, right, type, energy) {
    super(left, right, type, 0, energy, 0)
  }
}

export default EnergyLink
