import type { IBuilders } from './make-form-builder'
import {
  IValidationError,
  IValidation,
  StoredPlainObject,
  IDataTrigger
} from './types'
import { isBoolean, isNullOrUndefined } from './utils'

/**
 * Represents an instance of a field in a form
 */
export class Field {
  validations: IValidation[] = []

  constructor(
    public name: string, // Unique to the FormSchema e.g. mothersFirstName
    public label: string, // e.g. Mother's first name
    public viewType: string, // Determines what component will be used for editing/displaying the field e.g. firstName
    public isRequired: boolean | IDataTrigger = true
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
      isRequired: isBoolean(this.isRequired)
        ? this.isRequired
        : (this.isRequired as IDataTrigger).toJson()
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

    const isRequired = isBoolean(json.isRequired)
      ? json.isRequired
      : builders.dataTriggers
          .find((dt) => dt.name === json.isRequired.name)
          ?.fromJson(json.isRequired)
    if (typeof isRequired === 'undefined')
      throw new Error(`DataTrigger '${json?.isRequired?.name}' not registered`)

    const field = new Field(json.name, json.label, json.viewType, isRequired)

    field.validations = json?.validations.map((vJson) => {
      const validation = builders.validations.find(
        (v) => v.name === vJson?.type
      )
      if (!validation)
        throw new Error(`Validation '${vJson?.type}' not registered`)
      return validation.fromJson(vJson, builders.validations)
    })
    return field
  }
}
