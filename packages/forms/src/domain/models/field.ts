import { IPermission, PermissionFactory } from "@tngbl/auth"
import { StoredPlainObject } from "@tngbl/models"
import { GdprPolicy } from "@tngbl/secure-store"
import { IValidation, ValidationResult, ValidationFactory } from "."


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
  Duration = 'DURATION',
}


/**
 * Represents an instance of a field in a form
 */
export class Field {
  static readonly type = 'Field'

  name: string // Unique to the FormSchema e.g. firstName
  storageType: StorageType
  gdprPolicy: GdprPolicy
  permissions: IPermission[] = []
  validations: IValidation[] = []

  constructor (name: string, storageType: StorageType, gdprPolicy: GdprPolicy) {
    this.name = name
    this.storageType = storageType
    this.gdprPolicy = gdprPolicy
  }

  withValidations (validations: IValidation[]) {
    this.validations.push(...validations)
    return this
  }

  withPermissions (permissions: IPermission[]) {
    this.permissions.push(...permissions)
    return this
  }

  validate (data: object): ValidationResult {
    const result = new ValidationResult()
    result.errors = this.validations
      .map(v => v.validate(data))
      .flatMap(vRes => vRes.errors)

    return result
  }

  toPlainObject (): StoredPlainObject {
    return {
      name: this.name,
      type: Field.type,
      storageType: this.storageType,
      gdprPolicy: this.gdprPolicy.toPlainObject(),
      permissions: this.permissions,
      validations: this.validations.map(v => v.toPlainObject())
    }
  }

  static fromPlainObject (obj: any): Field {
    const gdprPolicy = GdprPolicy.fromPlainObject(obj.gdprPolicy)
    const field = new Field(obj.name, obj.storageType, gdprPolicy)
    field.permissions = obj.permissions.map(pObj => PermissionFactory.fromPlainObject(pObj))
    field.validations = obj.validations.map(vObj => ValidationFactory.fromPlainObject(vObj))
    return field
  }
}
