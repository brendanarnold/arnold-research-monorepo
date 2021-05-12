import { Schema } from './schema'
import {
  IValidation,
  IValidationError,
  StoredPlainObject,
  IView
} from './types'
import type { IBuilders } from './make-form-builder'
import { Field } from './field'
import { FieldSet } from './fieldset'

export type FormData = any

/**
 * Object that contains the data alongside the schema
 */
export class Form {
  static type = 'Form'

  name: string
  data: FormData = {}
  schema: Schema
  view: IView

  validate(): IValidationError[] {
    return this.schema.validate('', this.data)
  }

  validator(): IValidation {
    return this.schema
  }

  validatorFor(dataId: string): IValidation | undefined {
    const _findElement = (elements: (Field | FieldSet)[]) => {
      for (const element of elements) {
        if (element.name === dataId) return element
        if (element instanceof FieldSet) {
          const res = _findElement(element.structure)
          if (res) return res
        }
      }
    }
    return _findElement(this.schema.structure)
  }

  toJson(): StoredPlainObject {
    return {
      type: Form.type,
      name: this.name,
      data: this.data,
      schema: this.schema.toJson()
    }
  }

  static fromJson(json: any, builders: IBuilders): Form {
    const form = new Form()
    form.data = json.data
    form.name = json.name
    form.schema = Schema.fromJson(json.schema, builders)
    const viewBuilder = builders.views.find(
      (builder) => builder.type === json.view.type
    )
    if (!viewBuilder) throw Error(`Missing view builder '${json.view.type}'`)
    form.view = viewBuilder.fromJson(json.view)
    return form
  }
}
