import {
  IValidationCondition,
  IValidationError,
  StoredPlainObject,
  Builder,
  ITriggerCondition
} from './@types'
import { Field } from './field'
import { Trigger } from './trigger'
import { TrueTriggerCondition } from './core/triggers/true'
import { findInForm } from './utils/find'

/**
 * Represents a group of fields in a form
 */
export class FieldSet {
  static readonly type: string = 'FieldSet'
  name: string // e.g. nextOfKinDetails
  label: string // e.g. Next of kin details
  structure: (Field | FieldSet)[] = []
  validationConditions: IValidationCondition[] = []
  isRequired: Trigger = Trigger.AlwaysTrue

  itemFor(dataId: string): Field | FieldSet | undefined {
    return findInForm(this, dataId)
  }

  withValidations(validations: IValidationCondition[]): FieldSet {
    this.validationConditions.push(...validations)
    return this
  }

  validate(id: string, data: any): IValidationError[] {
    const formErrors = this.validationConditions
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
      validationConditions: this.validationConditions.map((v) => v.toJson()),
      isRequired:
        this.isRequired instanceof TrueTriggerCondition
          ? true
          : this.isRequired.trigger.toJson()
    }
  }

  static fromJson(json: any, builders: Builder[]): FieldSet {
    const fieldSet = new FieldSet()
    return FieldSet._populateFromJson(fieldSet, json, builders)
  }

  /** Used by Schema to populate itself */
  protected static _populateFromJson(
    fieldSet: FieldSet,
    json: any,
    builders: Builder[]
  ): FieldSet {
    fieldSet.name = json.name
    fieldSet.label = json.label
    fieldSet.validationConditions = json.validationConditions.map((vJson) =>
      builders.find((v) => v.type === vJson.name)?.fromJson(vJson, builders)
    )
    const trigger =
      json.isRequired === true
        ? new TrueTriggerCondition()
        : builders
            .find((dt) => dt.type === json.isRequired.type)
            ?.fromJson(json.isRequired)

    if (!trigger) {
      throw new TypeError(
        `Could not find trigger builder '${json.isRequired.type}'`
      )
    }

    fieldSet.isRequired = new Trigger(json.name, trigger as ITriggerCondition)
    fieldSet.structure = json.structure.map((valObj) =>
      valObj.type === Field.name
        ? Field.fromJson(valObj, builders)
        : FieldSet.fromJson(valObj, builders)
    )
    return fieldSet
  }
}
