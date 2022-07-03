import SparkMD5 from 'spark-md5'

class FileForeach {
  public chunkSize: number
  public chunks: number
  public currentChunk: number

  constructor(public file: File, chunkSize) {
    this.chunkSize = chunkSize || 1024 * 1024
    this.chunks = file.size / this.chunkSize
    this.currentChunk = 0
  }

  public isOutRange() {
    return this.currentChunk >= this.chunks
  }

  public forEach(callback) {
    while (!this.isOutRange()) {
      callback(this.currentChunk, this.nextLoad())
    }
  }

  public nextLoad() {
    const start = this.currentChunk * this.chunkSize
    const end = (start + this.chunkSize) > this.file.size ? this.file.size : start + this.chunkSize
    this.currentChunk++
    return this.file.slice(start, end)
  }
}

function ffeach(file: File, chunkSize: number) {
  return new FileForeach(file, chunkSize)
}

function hashFile(file: File, callback: (result: string) => void, chunkSize) {
  const fr = new FileReader()
  const spark = new SparkMD5.ArrayBuffer()
  const ff = ffeach(file, chunkSize)

  fr.onload = function (e) {
    spark.append(e.target?.result as any as ArrayBuffer)
    if (!ff.isOutRange()) {
      fr.readAsArrayBuffer(ff.nextLoad())
    } else {
      callback(spark.end(false))
    }
  }

  fr.readAsArrayBuffer(ff.nextLoad())
}

export default {
  ffeach,
  hashFile,
  FileForeach
}
