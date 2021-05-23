import { IValidation, IValidationError, StoredPlainObject } from './types'
import { Field } from './field'
import type { IBuilders } from './make-form-builder'
import { Trigger } from './trigger'
import { TrueTriggerCondition } from './core/triggers/true'

/**
 * Represents a group of fields in a form
 */
export class FieldSet {
  static readonly type: string = 'FieldSet'
  name: string // e.g. nextOfKinDetails
  label: string // e.g. Next of kin details
  structure: (Field | FieldSet)[] = []
  validations: IValidation[] = []
  isRequired: Trigger = Trigger.AlwaysTrue

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
      validations: this.validations.map((v) => v.toJson()),
      isRequired:
        this.isRequired instanceof TrueTriggerCondition
          ? true
          : this.isRequired.trigger.toJson()
    }
  }

  static fromJson(json: any, builders: IBuilders): FieldSet {
    const fieldSet = new FieldSet()
    fieldSet.name = json.name
    fieldSet.label = json.label
    fieldSet.validations = json.validations.map((vJson) =>
      builders.validations
        .find((v) => v.type === vJson.name)
        ?.fromJson(vJson, builders.validations)
    )
    const trigger =
      json.isRequired === true
        ? new TrueTriggerCondition()
        : builders.triggerConditions
            .find((dt) => dt.type === json.isRequired.type)
            ?.fromJson(json.isRequired)

    if (!trigger) {
      throw new TypeError(
        `Could not find trigger builder '${json.isRequired.type}'`
      )
    }

    fieldSet.isRequired = new Trigger(json.name, trigger)
    fieldSet.structure = json.structure.map((valObj) =>
      valObj.type === Field.name
        ? Field.fromJson(valObj, builders)
        : FieldSet.fromJson(valObj, builders)
    )
    return fieldSet
  }
}
