import { TrueTriggerCondition } from './core/triggers/true'
import type { IBuilders } from './make-form-builder'
import { Trigger } from './trigger'
import { IValidationError, IValidation, StoredPlainObject } from './types'
import { isNullOrUndefined } from './utils'

/**
 * Represents an instance of a field in a form
 */
export class Field {
  validations: IValidation[] = []

  constructor(
    public name: string, // Unique to the FormSchema e.g. mothersFirstName
    public label: string, // e.g. Mother's first name
    public viewType: string, // Determines what component will be used for editing/displaying the field e.g. firstName
    public isRequired: Trigger = Trigger.AlwaysTrue
  ) {}

  validate(id: string, data: FormData): IValidationError[] {
    return this.validations.map((v) => v.validate(id, data)).flat()
  }

  toJson(): StoredPlainObject {
    return {
      name: this.name,
      label: this.label,
      type: Field.name,
      viewType: this.viewType,
      validations: this.validations.map((v) => v.toJson()),
      isRequired:
        this.isRequired.trigger instanceof TrueTriggerCondition
          ? true
          : this.isRequired.trigger.toJson()
    }
  }

  static fromJson(json: any, builders: IBuilders): Field {
    if (isNullOrUndefined(json.isRequired))
      throw new Error(`Field JSON missing 'isRequired' property`)
    if (!Array.isArray(json.validations))
      throw new Error(`Field JSON 'validations' property is not an array`)
    if (isNullOrUndefined(json.name))
      throw new Error(`Field JSON is missing 'name' property`)
    if (isNullOrUndefined(json.label))
      throw new Error(`Field JSON is missing 'label' property`)
    if (isNullOrUndefined(json.viewType))
      throw new Error(`Field JSON is mossing 'viewType' property`)

    const isRequiredTrigger =
      json.isRequired === true
        ? new TrueTriggerCondition()
        : builders.triggerConditions
            .find((dt) => dt.type === json.isRequired.type)
            ?.fromJson(json.isRequired)
    if (typeof isRequiredTrigger === 'undefined')
      throw new Error(`DataTrigger '${json?.isRequired?.type}' not registered`)

    const field = new Field(
      json.name,
      json.label,
      json.viewType,
      new Trigger(json.name, isRequiredTrigger)
    )

    field.validations = json?.validations.map((vJson) => {
      const validation = builders.validations.find(
        (v) => v.type === vJson?.type
      )
      if (!validation)
        throw new Error(`Validation '${vJson?.type}' not registered`)
      return validation.fromJson(vJson, builders.validations)
    })
    return field
  }
}
