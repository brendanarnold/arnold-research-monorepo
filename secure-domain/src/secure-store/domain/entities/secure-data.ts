
import { decryptAes } from '../../utils/encryption'

export enum GdprDataType {
  Anonymised = 'ANONYMISED',
  Anonymous = 'ANONYMOUS',
  Personal = 'PERSONAL',
  SensitivePersonal = 'SENSITIVE_PERSONAL'
}



export class GdprPolicy {
  dataType: GdprDataType
  // Lifetime in seconds
  lifetimeSeconds: number
}

export type Storable = object | object[] | string | string[] | number | number[] | null | undefined

export class SecureData {
  id: string
  keyId: string
  encryptionMethod: string
  encryptedJson: Uint8Array
  decryptedValue: Storable
  encryptionIv: Uint8Array
  expiresOn: Date
  createdOn: Date
  gdprType: GdprDataType

  static fromDbRow (row) {
    const ed = new SecureData()
    ed.id = row.id
    ed.keyId = null
    ed.encryptionMethod = row.encryption_method
    ed.encryptedJson = row.encrypted_json
    ed.encryptionIv = row.encryption_iv
    ed.expiresOn = row.expires_on
    ed.createdOn = row.created_on
    ed.gdprType = row.gdpr_type

    ed.decryptedValue = decryptAes(ed.encryptedJson, ed.encryptionIv, ed.encryptionMethod)

    return ed
  }
}
