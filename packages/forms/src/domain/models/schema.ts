import { isBoolean, isNumber, isString, isNullOrUndefined } from '@tngbl/utils'
import { IPermission, PermissionFactory } from '@tngbl/auth'
import { GdprDataType, GdprPolicy } from '@tngbl/secure-store'
import { Json, SemVer, IntVer } from '@tngbl/models'
import { IValidation, ValidationError, ValidationFactory, ValidationResult } from "./validations"
import { DataTriggerFactor, IDataTrigger } from './triggers'
import { StoredPlainObject } from '@tngbl/models'
import { FormSyntaxError } from './exceptions'


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


export class FieldSet {

  static readonly type: string = 'FieldSet'
  name: string
  structure: (FieldInstance | FieldSet)[] = []
  validations: IValidation[] = []
  isRequired: (IDataTrigger | boolean) = true

  withDataSets (dataSets: FieldSet[]) {
    this.structure.push(...dataSets)
    return this
  }

  withValidations (validations: IValidation[]) {
    this.validations.push(...validations)
    return this
  }

  validate (data: any, fields: Field[]): ValidationResult {
    const formErrors = this.validations
      .map(validation => validation.validate(data))
      .flatMap(vResult => vResult.errors)
    const componentErrors = this.structure
      .map(component => component.validate(data[component.name], fields))
      .flatMap(vRes => vRes.errors)
    
    const result = new ValidationResult()
    result.errors = formErrors.concat(componentErrors)
    
    return result
  }

  toPlainObject (): StoredPlainObject {
    return {
      name: this.name,
      type: FieldSet.type,
      structure: this.structure.map(s => s.toPlainObject()),
      validations: this.validations.map(v => v.toPlainObject()),
      isRequired: isBoolean(this.isRequired)
        ? this.isRequired
        : (this.isRequired as IDataTrigger).toPlainObject()
    }
  }

  static fromPlainObject (obj: any): FieldSet {
    const dataSet = new FieldSet()
    if (isNullOrUndefined(obj)) {
      throw new FormSyntaxError(`Cannot convert null or undefined to type '${FieldSet.type}'`)
    }
    if (!isString(obj.name)) {
      throw new FormSyntaxError("Property 'name' is not a string")
    }
    dataSet.name = obj.name
    dataSet.validations = obj.validations.map(valObj => ValidationFactory.fromPlainObject(valObj))
    dataSet.structure = obj.structure.map(valObj => valObj.type === FieldInstance.type
      ? FieldInstance.fromPlainObject(valObj)
      : FieldSet.fromPlainObject(valObj))
    dataSet.isRequired = isBoolean(obj.isRequired)
      ? obj.isRequired
      : DataTriggerFactor.fromPlainObject(obj)
    return dataSet
  }
}


export class Schema extends FieldSet {
  /** Increment when make a breaking change to persistence marshalling */
  static readonly storageVersion: IntVer = 1
  static readonly type: string = 'Schema'

  schemaVersion: SemVer
  fields: Field[] = []

  validate (data: any): ValidationResult {
    return super.validate(data, this.fields)
  }

  toPlainObject (): StoredPlainObject {
    const obj = super.toPlainObject()
    obj.type = Schema.type
    obj.schemaVersion = this.schemaVersion
    obj.fields = this.fields.map(field => field.toPlainObject())
    return obj
  }

  static fromPlainObject (obj: any): Schema {
    const schema = new Schema()
    schema.schemaVersion = obj.schemaVersion
    schema.fields = obj.fields.map(fieldObj => Field.fromPlainObject(fieldObj))
    schema.name = obj.name
    schema.validations = obj.validations.map(valObj => ValidationFactory.fromPlainObject(valObj))
    schema.structure = obj.structure.map(valObj => valObj.type === FieldInstance.type
      ? FieldInstance.fromPlainObject(valObj)
      : FieldSet.fromPlainObject(valObj))
    schema.isRequired = isBoolean(obj.isRequired)
      ? obj.isRequired
      : DataTriggerFactor.fromPlainObject(obj)
    
    return schema
  }

  toJson (): string {
    return JSON.stringify(this.toPlainObject(), null, 2)
  }

  static fromJson (json: string): Schema {
    return Schema.fromPlainObject(JSON.parse(json))
  }
}



export class FieldInstance {
  static readonly type = 'FieldInstance'

  name: string // Unique to the FormSchema e.g. lastName1 or mothersMaidenName
  fieldName: string

  constructor (name: string, fieldName: string) {
    this.name = name
    this.fieldName = fieldName
  }

  validate (data: any, fields: Field[]) {
    const field = fields.find(field => field.name === this.fieldName)
    return field.validate(data)
  }

  toPlainObject (): StoredPlainObject {
    return {
      type: FieldInstance.type,
      fieldName: this.fieldName
    }
  }

  static fromPlainObject (obj: any): FieldInstance {
    // @todo Checks
    return new FieldInstance(obj.name, obj.fieldName)
  }
}


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
    if (isNullOrUndefined(obj)) {
      throw new FormSyntaxError(`Cannot convert null or undefined into ${Field.type} object`)
    }
    if (obj.type !== Field.type) {
      throw new FormSyntaxError(`Property 'type' is not '${Field.type}', is ${obj.type}` )
    }
    const gdprPolicy = GdprPolicy.fromPlainObject(obj.gdprPolicy)
    const field = new Field(obj.name, obj.storageType, gdprPolicy)
    field.permissions = obj.permissions.map(pObj => PermissionFactory.fromPlainObject(pObj))
    field.validations = obj.validations.map(vObj => ValidationFactory.fromPlainObject(vObj))
    return field
  }
}

