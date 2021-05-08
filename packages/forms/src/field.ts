import { IPermission } from '@tngbl/auth'
import { StoredPlainObject } from '@tngbl/models'
import type { IBuilders } from './make-form-builder'
import { IValidationError, IValidation } from './types'

/**
 * Represents an instance of a field in a form
 */
export class Field {
  permissions: IPermission[] = []
  validations: IValidation[] = []

  constructor(
    public name: string, // Unique to the FormSchema e.g. mothersFirstName
    public label: string, // e.g. Mother's first name
    public viewType: string // Determines what component will be used for editing/displaying the field e.g. firstName
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
      validations: this.validations.map((v) => v.toJson())
    }
  }

  static fromJson(json: any, builders: IBuilders): Field {
    const field = new Field(json.name, json.label, json.viewType)
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
