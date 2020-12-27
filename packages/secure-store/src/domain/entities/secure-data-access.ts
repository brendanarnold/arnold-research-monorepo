
export enum AccessRule {
  Permitted = 'PERMITTED',
  Denied = 'DENIED'
}

export class SecureDataAccess {
  id: string
  createdOn: Date
  accessingEntityId: string
  encryptedDataId: string
  accessRule: AccessRule

  static fromStore (storeObj) {
    // @todo
    return new SecureDataAccess()
  }
}
