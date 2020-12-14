import { isBoolean } from '../../../shared/utils/types'
import { Permission } from "../../../auth/domain/models"
import { GdprDataType, GdprPolicy } from "../../../secure-store/domain/entities/secure-data"
import { Json, SemVer } from "../../../shared/models"
import { Validation, ValidationResult } from "./validations"


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


export interface DataTrigger {
  isTriggered: (object) => boolean
  toPlainObject: () => object
}


export class DataSet {
  name: string
  schema: (DataField | DataSet)[] = []
  validations: Validation[] = []
  isRequired: (DataTrigger | boolean) = true

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

  toPlainObject (): object {
    return {
      name: this.name,
      schema: this.schema.map(s => s.toPlainObject()),
      validations: this.validations.map(v => v.toPlainObject()),
      isRequired: isBoolean(this.isRequired)
        ? this.isRequired
        : (this.isRequired as DataTrigger).toPlainObject()
    }
  }
}


export class FormSchema {
  name: string 
  storageVersion: SemVer = '0.0.1'
  schemaVersion: SemVer
  schema: (DataSet | DataField)[] = []
  validations: Validation[] = []

  constructor (name: string, schemaVersion: string) {
    this.name = name
    this.schemaVersion = schemaVersion
  }

  withSchema (schemaItems: (DataSet | DataField)[]) {
    this.schema.push(...schemaItems)
    return this
  }

  withValidations (validations: Validation[]) {
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

  toPlainObject (): object {
    return {
      name: this.name,
      storageVersion: this.storageVersion,
      schemaVersion: this.schemaVersion,
      schema: this.schema.map(schemaItem => schemaItem.toPlainObject()),
      validations: this.validations.map(v => v.toPlainObject())
    }
  }

  toJson (): Json {
    return JSON.stringify(this.toPlainObject(), null, 2)
  }
}


export class DataField {
  name: string
  type: StorageType
  gdprPolicy: GdprPolicy
  permissions: Permission[] = []
  validations: Validation[] = []


  constructor (name: string, type: StorageType, gdprPolicy: GdprPolicy) {
    this.name = name
    this.type = type
    this.gdprPolicy = gdprPolicy
  }

  withValidations (validations: Validation[]) {
    this.validations.push(...validations)
    return this
  }

  withPermissions (permissions: Permission[]) {
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

  toPlainObject (): object {
    return {
      name: this.name,
      type: this.type,
      gdprType: this.gdprPolicy.toPlainObject(),
      permissions: this.permissions,
      validations: this.validations.map(v => v.toPlainObject())
    }
  }
}

