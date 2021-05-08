import { StoredPlainObject } from '@tngbl/models'
import { IValidation, IValidationError, IDataTrigger } from './types'
import { Field } from './field'
import type { IBuilders } from './make-form-builder'

/**
 * Represents a group of fields in a form
 */
export class FieldSet {
  static readonly type: string = 'FieldSet'
  name: string // e.g. nextOfKinDetails
  label: string // e.g. Next of kin details
  structure: (Field | FieldSet)[] = []
  validations: IValidation[] = []
  isRequired: IDataTrigger | boolean = true

  withDataSets(dataSets: FieldSet[]): FieldSet {
    this.structure.push(...dataSets)
    return this
  }

  withValidations(validations: IValidation[]): FieldSet {
    this.validations.push(...validations)
    return this
  }

  validate(id: string, data: any): IValidationError[] {
    const formErrors = this.validations
      .map((validation) => validation.validate(id, data))
      .flat()
    const componentErrors = this.structure
      .map((component) =>
        component.validate(component.name, data[component.name])
      )
      .flat()

    return formErrors.concat(componentErrors)
  }

  toJson(): StoredPlainObject {
    return {
      name: this.name,
      type: FieldSet.type,
      label: this.label,
      structure: this.structure.map((s) => s.toJson()),
      validations: this.validations.map((v) => v.toJson())
    }
  }

  static fromJson(obj: any, builders: IBuilders): FieldSet {
    const fieldSet = new FieldSet()
    fieldSet.name = obj.name
    fieldSet.label = obj.label
    fieldSet.validations = obj.validations.map((valObj) =>
      builders.validations[valObj.name].fromJson(valObj, builders.validations)
    )
    fieldSet.structure = obj.structure.map((valObj) =>
      valObj.type === Field.name
        ? Field.fromJson(valObj, builders)
        : FieldSet.fromJson(valObj, builders)
    )
    return fieldSet
  }
}
