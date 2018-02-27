const { Transform } = require("stream")

class PartStream extends Transform {
  constructor(start, end, options) {
    super(options)
    this._start = start
    this._end = end
    this._ind = 0
  }

  _transform(chunk, encoding, callback) {
    const start = this._start
    const end = this._end + 1
    const ind = this._ind
    const chunkLen = chunk.length

    this.ind = ind + chunkLen

    if (ind + chunkLen < start || ind > end) {
      callback()
    } else if (ind >= start && ind + chunkLen <= end) {
      callback(null, chunk)
    } else {
      const chunkStart = start - ind < 0 ? 0 : start - ind
      const chunkEnd = chunkStart + end - Math.max(start, ind)
      callback(null, chunk.slice(chunkStart, chunkEnd))
    }
  }
}

module.exports = PartStream
