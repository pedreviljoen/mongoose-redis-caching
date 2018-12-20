const redis     = require('redis')
const util      = require('util')
const redisUrl  = process.env.REDIS_URL || 'redis://127.0.0.1:6379'
const client    = redis.createClient(redisUrl)
client.get      = util.promisify(client.get)

module.exports = function (mongoose) {
    const exec = mongoose.Query.prototype.exec

    mongoose.Query.prototype.cache = function () {
        this._cache = true
        return this
    }
    
    mongoose.Query.prototype.exec = async function () {
        console.log(`[QUERY]: ${this.getQuery()}`)
        console.log(`[COL]: ${this.mongooseClient.name}`)
    
        if (!this._cache) {
            return exec.apply(this, arguments)
        }
    
        const key = JSON.stringify(
            Object.assign({}, this.getQuery(), {
                collection: this.mongooseClient.name
            })
        )
    
        const cacheValue = await client.get(key)
        if (cacheValue) {
            const doc = JSON.parse(cacheValue)
    
            return Array.isArray(doc) 
                ? (doc.map(d => new this.model(d))) 
                : new this.model(doc)
        }
    
        const result = await exec.apply(this, arguments)
        client.set(key, JSON.stringify(result), 'EX', 10)
        return result
    }
}