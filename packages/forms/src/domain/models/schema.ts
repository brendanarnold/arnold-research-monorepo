import { isBoolean } from '@tngbl/utils'
import { Json, SemVer, IntVer } from '@tngbl/models'
import { IValidation, ValidationFactory, ValidationResult } from "./validations"
import { DataTriggerFactor, IDataTrigger } from './triggers'
import { StoredPlainObject } from '@tngbl/models'
import { Field } from './field'

/**
 * Represents a group of fields in a form
 */
export class FieldSet {

  static readonly type: string = 'FieldSet'
  name: string
  structure: (Field | FieldSet)[] = []
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

  validate (data: any): ValidationResult {
    const formErrors = this.validations
      .map(validation => validation.validate(data))
      .flatMap(vResult => vResult.errors)
    const componentErrors = this.structure
      .map(component => component.validate(data[component.name]))
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
    dataSet.name = obj.name
    dataSet.validations = obj.validations.map(valObj => ValidationFactory.fromPlainObject(valObj))
    dataSet.structure = obj.structure.map(valObj => valObj.type === Field.type
      ? Field.fromPlainObject(valObj)
      : FieldSet.fromPlainObject(valObj))
    dataSet.isRequired = isBoolean(obj.isRequired)
      ? obj.isRequired
      : DataTriggerFactor.fromPlainObject(obj)
    return dataSet
  }
}


/**
 * Represents the structure of a form
 */
export class Schema extends FieldSet {
  /** Increment when make a breaking change to persistence marshalling */
  static readonly storageVersion: IntVer = 1
  static readonly type: string = 'Schema'

  schemaVersion: SemVer

  toPlainObject (): StoredPlainObject {
    const obj = super.toPlainObject()
    obj.type = Schema.type
    obj.schemaVersion = this.schemaVersion
    return obj
  }

  static fromPlainObject (obj: any): Schema {
    const schema = (FieldSet.fromPlainObject(obj) as Schema)
    schema.schemaVersion = obj.schemaVersion
    schema.name = obj.name
    
    return schema
  }

  toJson (): Json {
    return JSON.stringify(this.toPlainObject(), null, 2)
  }

  static fromJson (json: Json): Schema {
    return Schema.fromPlainObject(JSON.parse(json))
  }
}


