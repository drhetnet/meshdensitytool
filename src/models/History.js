export const DEVICES = "devices"
export const STATS = "stats"

class History {
  constructor () {
    this._entryInProgress = false
    this._entries = []
  }

  /**
   * Add a new entry to the history.
   */
  startEntry () {
    this._entryInProgress = true
    this.currentEntry = new Map()
    this.currentEntryStats = new Map()

    this.currentEntry.set("hello", "goodby")

    return this
  }

  /**
   * Commit an entry to the history.
   */
  endEntry () {
    this.currentEntry.set(STATS, this.currentEntryStats)
    this._entries.push(this.currentEntry)
    this._entryInProgress = false

    return this.currentEntry
  }

  /**
   * Add devices to a history entry.
   * @requires An entry must be in progress.
   * @param {Device Array} devices
   */
  addDevices (devices) {
    if (!this._entryInProgress) {
      return null
    }

    this.currentEntry.set(DEVICES, devices)

    return this
  }

  /**
   * Add a stat to the history.
   * @param {string} name
   * @param {number} value
   */
  addStat (name, value) {
    if (!this._entryInProgress) {
      return null
    }

    this.currentEntryStats.set(name, value)

    return this
  }

  get entryInProgress () {
    return this._entryInProgress
  }

  get entries () {
    return this._entries
  }
}

export default History
