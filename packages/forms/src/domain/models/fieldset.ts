import { StoredPlainObject } from "@tngbl/models"
import { isBoolean } from "@tngbl/utils"
import { IValidation, ValidationResult, ValidationFactory } from "./validations"
import { IDataTrigger, DataTriggerFactory } from './triggers'
import { Field } from "./field"

/**
 * Represents a group of fields in a form
 */
export class FieldSet {

  static readonly type: string = 'FieldSet'
  name: string // e.g. nextOfKinDetails
  label: string // e.g. Next of kin details
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
      label: this.label,
      structure: this.structure.map(s => s.toPlainObject()),
      validations: this.validations.map(v => v.toPlainObject()),
      isRequired: isBoolean(this.isRequired)
        ? this.isRequired
        : (this.isRequired as IDataTrigger).toPlainObject()
    }
  }

  static fromPlainObject (obj: any): FieldSet {
    const fieldSet = new FieldSet()
    fieldSet.name = obj.name
    fieldSet.label = obj.label
    fieldSet.validations = obj.validations.map(valObj => ValidationFactory.fromPlainObject(valObj))
    fieldSet.structure = obj.structure.map(valObj => valObj.type === Field.type
      ? Field.fromPlainObject(valObj)
      : FieldSet.fromPlainObject(valObj))
    fieldSet.isRequired = isBoolean(obj.isRequired)
      ? obj.isRequired
      : DataTriggerFactory.fromPlainObject(obj)
    return fieldSet
  }
}
