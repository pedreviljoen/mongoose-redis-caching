const zlib = require('zlib')
const util = require('util')
zlib.deflate = util.promisify(zlib.deflate)
zlib.inflate = util.promisify(zlib.inflate)

async function compress (data){
    return await zlib.deflate(data)
}

async function decompress (data) {
    return await zlib.inflate(data)
}

module.exports = {
    compress,
    decompress
}
