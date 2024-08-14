
let enableCache = true
// enableCache = false

const sqliteStore = require('cache-manager-sqlite')
const cacheManager = require('cache-manager')
// const Database = require("better-sqlite3")
// const ShellSpawn = require('./../lib/ShellSpawn.js')

/* global path, __dirname, cacheClass, sequelize, databases, databaseName */
const cachePath = '/cache/'
const path = require('path')
const fs = require('fs');
const { emitWarning } = require('process');

function isAsyncFunction(func) {
  return func.constructor.name === 'AsyncFunction';
}

let NodeCacheSqlite = {
  databases: {},
  getDatabase: async function (databaseName) {

    if (typeof(databaseName) !== 'string') {
      console.trace(['databaseName is invalid: ', JSON.stringify(databaseName), (new Date().toISOString())].join('\t'))
    }

    if (this.databases[databaseName]) {
      return this.databases[databaseName]
    }

    this.databases[databaseName] = cacheManager.caching({
      store: sqliteStore,
      name: 'cache',
      path: path.join(cachePath, 'node-cache-sqlite_' + databaseName + '.sqlite')
    })

    // console.log(path.join(cachePath, databaseName + '.sqlite'), fs.existsSync(path.join(cachePath, databaseName + '.sqlite')))
    // console.log(this.databases[databaseName])
    // process.exit(1)

    return this.databases[databaseName]
  },
  get: async function (databaseName, key, value, expire) {
    // console.log(databaseName)
    let database = await this.getDatabase(databaseName)

    let result = await database.get(key)

    if (!expire || (result === undefined && value !== undefined)) {
      result = await this.set(databaseName, key, value, expire)
    }
    else {
      // console.log(['[CACHE] hitted', databaseName, key, expire, (new Date().toISOString())].join('\t'))
    }
    this.autoClean(databaseName)
    return result
  },
  set: async function (databaseName, key, value, expire) {
    // console.log(databaseName)
    let database = await this.getDatabase(databaseName)

    let result = value
    if (typeof(value) === 'function') {
      try {
        if (isAsyncFunction(value)) {
          result = await value()
          
        }
        else {
          result = value()
        }
      }
      catch (e) {
        return undefined
      }
      // console.log(key, result)
      if (result !== undefined) {
        await database.set(key, result, { ttl: expire / 1000})
      }
        
    }
    else {
      // console.log(key, result)
      await database.set(key, result, {ttl: expire / 1000})
    }
    return result
  },
  isExists: async function (databaseName, key) {
    // return ((await this.get(databaseName, key)) !== undefined)
    let database = await this.getDatabase(databaseName)
    let result = await database.get(key)

    // console.log('[CACHE]', 'isExists', key, result, (result !== undefined && result !== null))

    return (result !== undefined && result !== null)
  },
  clear: async function (databaseName, key) {
    // await database.del(key)
    if (await this.isExists(databaseName, key)) {
      let database = await this.getDatabase(databaseName)
      await database.set(key, undefined, {ttl: 0})
    }
    console.log([`[CACHE] clear`, databaseName, key, (new Date().toISOString())].join('\t'))
    return true
  },
  autoCleanTimer: {},
  autoClean: async function (databaseName) {
    if (this.autoCleanTimer[databaseName]) {
      clearTimeout(this.autoCleanTimer[databaseName])
    }
    this.autoCleanTimer[databaseName] = setTimeout(async () => {
      // 要怎麼移除呢...
      let database = await this.getDatabase(databaseName)
      // console.log(database.store.db)
      // const databasePath = path.join(cachePath, 'node-cache-sqlite_' + databaseName + '.sqlite')
      // console.log(databasePath)
      // const sqlite = new Database(databasePath);
      const sqlite = database.store.db
      // sqlite.exec(`DELETE FROM cache WHERE expiredAt != -1 AND expiredAt < ?`)
      const purgeStatement = sqlite.prepare(`DELETE FROM cache WHERE expire_at != -1 AND expire_at < ?`);
      const ts = new Date().getTime();
      await purgeStatement.run(ts)
      
      // ShellSpawn([`sqlite3`, `${databasePath}`, `"VACUUM;"`])
      await sqlite.exec(`VACUUM;`)
      console.log(`[NodeCacheSqlite] VACUUM`, databaseName )
    }, 30 * 1000)
  }
}

module.exports = NodeCacheSqlite