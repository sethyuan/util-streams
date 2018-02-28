const { Transform } = require("stream")

function pipeStream(concatStream, streams, i) {
  streams[i].once("end", () => {
    if (i + 1 < streams.length) {
      pipeStream(concatStream, streams, i + 1)
    } else {
      concatStream.end()
    }
  })
  streams[i].pipe(concatStream, { end: false })
}

class ConcatStream extends Transform {
  constructor(streams, options) {
    super(options)
    if (!streams || streams.length < 1) {
      this.push(null)
    } else {
      pipeStream(this, streams, 0)
    }
  }

  _transform(chunk, encoding, callback) {
    callback(null, chunk)
  }
}

module.exports = ConcatStream
