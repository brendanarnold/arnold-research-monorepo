
import { Pool, QueryResult } from 'pg'
import { Monitor } from '@tngbl/monitor'
import config from '../../config'

let _pool
  
const _init = () => {
  _pool = new Pool({
    connectionString: config.POSTGRES_CONNECTION_STRING
  })

  const monitor = new Monitor()
  
  // Handles errors for idle connections in the pool
  _pool.on('error', (error, client) => {
    monitor.trace({ error })
    process.exit(-1) // @fixme Should this exit?
  })
}


export const pool = (): Pool => {
  if (!_pool) {
    _init()
  }
  return _pool
}


