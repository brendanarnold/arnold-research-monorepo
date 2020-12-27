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


export class DataSet {

  static readonly type = 'DataSet'
  name: string
  schema: (DataField | DataSet)[] = []
  validations: IValidation[] = []
  isRequired: (IDataTrigger | boolean) = true

  validate (data): ValidationResult {
    const formErrors = this.validations
      .map(validation => validation.validate(data))
      .flatMap(vResult => vResult.errors)
    const componentErrors = this.schema
      .map(component => component.validate(data[component.name]))
      .flatMap(vRes => vRes.errors)
    
    const result = new ValidationResult()
    result.errors = formErrors.concat(componentErrors)
    
    return result
  }

  toPlainObject (): StoredPlainObject {
    return {
      name: this.name,
      type: DataSet.type,
      schema: this.schema.map(s => s.toPlainObject()),
      validations: this.validations.map(v => v.toPlainObject()),
      isRequired: isBoolean(this.isRequired)
        ? this.isRequired
        : (this.isRequired as IDataTrigger).toPlainObject()
    }
  }

  static fromPlainObject (obj: any): DataSet {
    const dataSet = new DataSet()
    if (isNullOrUndefined(obj)) {
      throw new FormSyntaxError(`Cannot convert null or undefined to type '${DataSet.type}'`)
    }
    if (!isString(obj.name)) {
      throw new FormSyntaxError("Property 'name' is not a string")
    }
    dataSet.name = obj.name
    dataSet.validations = obj.validations.map(valObj => ValidationFactory.fromPlainObject(valObj))
    dataSet.schema = obj.schema.map(valObj => valObj.type === DataField.type
      ? DataField.fromPlainObject(valObj)
      : DataSet.fromPlainObject(valObj))
    dataSet.isRequired = isBoolean(obj.isRequired)
      ? obj.isRequired
      : DataTriggerFactor.fromPlainObject(obj)
    return dataSet
  }
}

export class FormSchema {
  /** Increment when make a breaking change to persistence marshalling */
  static readonly storageVersion: IntVer = 1
  static readonly type = 'FormSchema'
  
  name: string 
  schemaVersion: SemVer
  schema: (DataSet | DataField)[] = []
  validations: IValidation[] = []

  constructor (name: string, schemaVersion: string) {
    this.name = name
    this.schemaVersion = schemaVersion
  }

  withSchema (schemaItems: (DataSet | DataField)[]) {
    this.schema.push(...schemaItems)
    return this
  }

  withValidations (validations: IValidation[]) {
    this.validations.push(...validations)
    return this
  }

  validate (data): ValidationResult {
    const formErrors = this.validations
      .map(validation => validation.validate(data))
      .flatMap(vResult => vResult.errors)
    const schemaErrors = this.schema
      .map(component => component.validate(data[component.name]))
      .flatMap(vRes => vRes.errors)
    
    const result = new ValidationResult()
    result.errors = formErrors.concat(schemaErrors)
    
    return result
  }

  toPlainObject (): StoredPlainObject {
    return {
      name: this.name,
      type: FormSchema.type,
      storageVersion: FormSchema.storageVersion,
      schemaVersion: this.schemaVersion,
      schema: this.schema.map(schemaItem => schemaItem.toPlainObject()),
      validations: this.validations.map(v => v.toPlainObject())
    }
  }

  toJson (): Json {
    return JSON.stringify(this.toPlainObject(), null, 2)
  }

  static fromPlainObject (obj: any): FormSchema {
    if (isNullOrUndefined(obj)) {
      throw new FormSyntaxError(`Cannot convert null or undefined to type ${FormSchema.type}`)
    }
    if (obj.type !== FormSchema.type) {
      throw new FormSyntaxError(`Object is not of ${FormSchema.type} type, is '${obj.type}'`)
    }
    if (!isNumber(obj.storageVersion)) {
      throw new FormSyntaxError(`Property 'storageVersion' is not a string, is '${obj.storageVersion}'`)
    }
    if (!isString(obj.name)) {
      throw new FormSyntaxError(`Property 'name' is not a string, is '${obj.name}'`)
    }
    if (!Array.isArray(obj.schema)) {
      throw new FormSyntaxError(`Property 'schema' is not an array, is '${obj.schema}'`)
    }
    if (!Array.isArray(obj.validations)) {
      throw new FormSyntaxError(`Property 'validations' is not an array, is ${obj.validations}`)
    }

    const form = new FormSchema(obj.name, obj.schemaVersion)
    
    form.validations = obj.validations.map(valObj => ValidationFactory.fromPlainObject(valObj))
    form.schema = obj.schema.map(valObj => valObj.type === DataField.type
      ? DataField.fromPlainObject(valObj)
      : DataSet.fromPlainObject(valObj))

    return form
  }

  static fromJson (jsonString: string): FormSchema {
    let json
    try {
      json = JSON.parse(jsonString)
    } catch (error) {
      if (error instanceof SyntaxError) {
        throw new FormSyntaxError('JSON is not valid')
      }
    }
    return FormSchema.fromPlainObject(json)
  }

}


export class DataField {
  static readonly type = 'DataField'

  name: string
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
      type: DataField.type,
      storageType: this.storageType,
      gdprPolicy: this.gdprPolicy.toPlainObject(),
      permissions: this.permissions,
      validations: this.validations.map(v => v.toPlainObject())
    }
  }

  static fromPlainObject (obj: any): DataField {
    if (isNullOrUndefined(obj)) {
      throw new FormSyntaxError(`Cannot convert null or undefined into ${DataField.type} object`)
    }
    if (obj.type !== DataField.type) {
      throw new FormSyntaxError(`Property 'type' is not '${DataField.type}', is ${obj.type}` )
    }
    const gdprPolicy = GdprPolicy.fromPlainObject(obj.gdprPolicy)
    const field = new DataField(obj.name, obj.storageType, gdprPolicy)
    field.permissions = obj.permissions.map(pObj => PermissionFactory.fromPlainObject(pObj))
    field.validations = obj.validations.map(vObj => ValidationFactory.fromPlainObject(vObj))
    return field
  }
}

