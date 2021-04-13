import { UUID } from '@tngbl/models'

export interface IGroup {
  uuid: UUID
  name: string
}

export interface IPermission {
  allowed: IGroup[]
  denied: IGroup[]
}

export class PermissionFactory {
  private static _permissionLookup: { [key: string]: (any) => IPermission } = {}

  static register(type: string, fromPlainObject: (any) => IPermission): void {
    {
      PermissionFactory._permissionLookup[type] = fromPlainObject
    }
  }

  static fromPlainObject(obj: any): IPermission {
    const fromPlainObject = PermissionFactory._permissionLookup[obj.type]
    return fromPlainObject(obj)
  }
}
