import { IPermission, PermissionFactory } from '@tngbl/auth'
import { StoredPlainObject } from '@tngbl/models'
import { GdprPolicy } from '@tngbl/secure-store'
import type { IBuilders } from '../../form-module'
import { IValidationError, IValidation } from '../../validations'

/**
 * Defines the type used in the persistence layer
 */
export enum StorageType {
  String = 'STRING',
  Uuid = 'UUID',
  Integer = 'INTEGER',
  Float = 'FLOAT',
  Object = 'OBJECT',
  Date = 'DATE',
  Time = 'TIME',
  Timestamp = 'TIMESTAMP',
  Duration = 'DURATION'
}

/**
 * Represents an instance of a field in a form
 */
export class Field {
  static readonly type = 'Field'

  name: string // Unique to the FormSchema e.g. mothersFirstName
  label: string // e.g. Mother's first name
  storageType: StorageType
  viewType: string // Determines what component will be used for editing/displaying the field e.g. firstName
  gdprPolicy: GdprPolicy
  permissions: IPermission[] = []
  validations: IValidation[] = []

  constructor(
    name: string,
    label: string,
    storageType: StorageType,
    gdprPolicy: GdprPolicy,
    viewType: string
  ) {
    this.name = name
    this.label = label
    this.storageType = storageType
    this.gdprPolicy = gdprPolicy
    this.viewType = viewType
  }

  withPermissions(permissions: IPermission[]): Field {
    this.permissions.push(...permissions)
    return this
  }

  validate(id: string, data: FormData): IValidationError[] {
    return this.validations.map((v) => v.validate(id, data)).flat()
  }

  toPlainObject(): StoredPlainObject {
    return {
      name: this.name,
      label: this.label,
      type: Field.type,
      viewType: this.viewType,
      storageType: this.storageType,
      gdprPolicy: this.gdprPolicy.toPlainObject(),
      permissions: this.permissions,
      validations: this.validations.map((v) => v.toPlainObject())
    }
  }

  static fromPlainObject(obj: any, builders: IBuilders): Field {
    const gdprPolicy = GdprPolicy.fromPlainObject(obj.gdprPolicy)
    const field = new Field(
      obj.name,
      obj.label,
      obj.storageType,
      gdprPolicy,
      obj.viewType
    )
    field.permissions = obj.permissions.map((pObj) =>
      PermissionFactory.fromPlainObject(pObj)
    )
    field.validations = obj.validations.map((vObj) =>
      builders.validations[vObj.name].fromPlainObject(
        vObj,
        builders.validations
      )
    )
    return field
  }
}
