import { utils, StoredPlainObject } from '@tngbl/forms'

export enum GdprDataType {
  Anonymised = 'ANONYMISED',
  Anonymous = 'ANONYMOUS',
  Personal = 'PERSONAL',
  SensitivePersonal = 'SENSITIVE_PERSONAL'
}

export enum GdprLifetime {
  Transient = 'TRANSIENT',
  Persistent = 'PERSISTENT'
}

export class GdprPolicy {
  static type = 'GdprPolicy'
  dataType: GdprDataType
  // Lifetime in seconds
  lifetimeSeconds: GdprLifetime | number = GdprLifetime.Persistent

  constructor(dataType: GdprDataType, lifetimeSeconds: GdprLifetime | number) {
    this.dataType = dataType
    this.lifetimeSeconds = lifetimeSeconds
  }

  toPlainObject(): StoredPlainObject {
    return {
      type: GdprPolicy.type,
      dataType: this.dataType,
      lifetimeSeconds: this.lifetimeSeconds
    }
  }

  static fromPlainObject(obj: any): GdprPolicy {
    if (obj.type !== GdprPolicy.type) {
      throw TypeError(
        `Cannot cast an object of type '${obj.type}' to GdprPolicy`
      )
    }
    if (
      !utils.isNumber(obj.lifetimeSeconds) &&
      !Object.values(GdprLifetime).includes(obj.lifetimeSeconds)
    ) {
      throw TypeError(
        `Invalid lifetimeSeconds property on GdprPolicy: ${obj.lifetimeSeconds}`
      )
    }
    return new GdprPolicy(obj.dataType, obj.lifetimeSeconds)
  }
}

export type Storable =
  | Record<string, unknown>
  | Record<string, unknown>[]
  | string
  | string[]
  | number
  | number[]
  | null
  | undefined

export class SecureData {
  id: string
  keyId: string | null
  encryptionMethod: string
  encryptedJson: Uint8Array
  decryptedValue: Storable
  encryptionIv: Uint8Array
  expiresOn: Date
  createdOn: Date
  gdprType: GdprDataType

  static fromDbRow(row: Record<string, any>): SecureData {
    const ed = new SecureData()
    ed.id = row.id
    ed.keyId = null
    ed.encryptionMethod = row.encryption_method
    ed.encryptedJson = row.encrypted_json
    ed.encryptionIv = row.encryption_iv
    ed.expiresOn = row.expires_on
    ed.createdOn = row.created_on
    ed.gdprType = row.gdpr_type

    // @fixme
    ed.decryptedValue = ''
    // ed.decryptedValue = decryptAes(
    //   ed.encryptedJson,
    //   ed.encryptionIv,
    //   ed.encryptionMethod,
    //   '' // @todo Get the key
    // )

    return ed
  }
}
