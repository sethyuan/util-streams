const { Transform } = require("stream")

class DropStream extends Transform {
  constructor(num, options) {
    super(options)
    this._num = num
    this._ind = 0
  }

  _transform(chunk, encoding, callback) {
    const num = this._num
    const ind = this._ind
    const chunkLen = chunk.length

    this._ind = ind + chunkLen

    if (ind + chunkLen <= num) {
      callback()
    } else if (ind >= num) {
      callback(null, chunk)
    } else {
      const chunkStart = num - ind < 0 ? 0 : num - ind
      callback(null, chunk.slice(chunkStart))
    }
  }
}

module.exports = DropStream
