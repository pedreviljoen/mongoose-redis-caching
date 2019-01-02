const redis     = require('redis')
const util      = require('util')
const redisUrl  = process.env.REDIS_URL || 'redis://127.0.0.1:6379'
const client    = redis.createClient(redisUrl)
const { compress, decompress } = require('./compress') 
client.get      = util.promisify(client.get)


module.exports = function (mongoose) {
    const exec = mongoose.Query.prototype.exec

    mongoose.Query.prototype.cache = function (time) {
        this._cache = true

        if (time) {
            this._expire = time
        }
        return this
    }

    mongoose.Query.prototype.compress = function () {
        this._compress = true

        return this
    }
    
    mongoose.Query.prototype.exec = async function () {    
        if (!this._cache) {
            return exec.apply(this, arguments)
        }
        console.log(`[LOG] Serving from cache`)
    
        const key = JSON.stringify(
            Object.assign({}, this.getQuery())
        )
    
        const cacheValue = await client.get(key)
        if (cacheValue) {
            if (this.compress) {
                decompress(cacheValue).then(data => {
                    try {
                        const input = JSON.parse(data.toString())

                        return Array.isArray(input) 
                        ? (input.map(i => new this.model(i)))
                        : new this.model(input)
                    } catch (error) {
                        console.log(`[ERR]: ${error}`)
                        return
                    }                    
                }).catch(error => {
                    console.log(`[ERR]: ${error}`)
                    return
                })
            }

            const doc = JSON.parse(cacheValue)
            return Array.isArray(doc) 
                ? (doc.map(d => new this.model(d))) 
                : new this.model(doc)
        }
    
        const result = await exec.apply(this, arguments)
        if (!this._compress) {
            client.set(key, JSON.stringify(result), 'EX', this._expire ? this._expire : 60)
        } else {
            try{
                compress(JSON.stringify(result)).then(data => {
                    client.set(key, data.toString(), 'EX', this._expire ? this._expire : 60)
                }).catch(error => {
                    console.log(`[ERR]: ${error}`)
                })
            } catch (error) {
                console.log(`[ERR]: ${error}`)
                return
            }
        }
        
        return result
    }
}