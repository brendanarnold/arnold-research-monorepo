
import { encryptAes, decryptAes } from '@tngbl/utils/encryption'
import * as db from '../database'
import * as uuid from 'uuid'
import { SecureData, Storable, GdprPolicy, GdprLifetime } from '../../entities/secure-data'
import { isNullOrUndefined } from '@tngbl/utils/types'


export const create = async (obj: Storable, gdprPolicy: GdprPolicy) => {
  const json = JSON.stringify(obj)
  const { iv, encryptedValue, encryptionMethod } = encryptAes(json)
  
  const nowTimestamp = new Date().getTime()

  const data = new SecureData()
  data.createdOn = new Date()
  if (gdprPolicy.lifetimeSeconds === GdprLifetime.Persistent) {
    data.expiresOn = undefined // Never expires
  } else if (gdprPolicy.lifetimeSeconds === GdprLifetime.Transient) {
    data.expiresOn = new Date() // Expires immediately
  } else {
    data.expiresOn = new Date(nowTimestamp + (gdprPolicy.lifetimeSeconds as number) * 1000)
  }
  data.encryptedJson = Buffer.from(encryptedValue, 'utf-8')
  data.encryptionIv = iv
  data.encryptionMethod = encryptionMethod
  data.gdprType = gdprPolicy?.dataType
  data.id = uuid.v4()
  
  const sql = `INSERT tbl_secure_data (id, key_id, encryption_method, expires_on, 
  created_on, encrypted_json, gdpr_type, encryption_iv) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`

  await db.pool().query(sql, [
    data.id,
    null, // Key ID
    data.encryptionMethod,
    data.expiresOn,
    data.createdOn,
    data.encryptedJson,
    data.encryptionIv
  ])

  return data
}


export const byIds = async (ids: string[]) => {
  const sql = 'SELECT * FROM tbl_secure_data WHERE id=$1'
  const result = await db.pool().query(sql, ids)
  const objects = result.rows.map(row => SecureData.fromDbRow(row))
  return objects
}


export default {
  create,
  byIds
}
