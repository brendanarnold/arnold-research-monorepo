import { Schema } from './schema'
import {
  IValidationCondition,
  IValidationError,
  StoredPlainObject,
  IView
} from './@types'
import type { IBuilders } from './make-form-builder'
import { Field } from './field'
import { FieldSet } from './fieldset'
import { Validator } from './validator'
import { findInForm } from './utils/find'

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

  get validator(): Validator {
    return new Validator(this.schema.validationConditions, undefined, this.data)
  }

  validatorFor(dataId: string): Validator | undefined {
    const validationConditions = findInForm(this.schema, dataId)
      ?.validationConditions
    return validationConditions
      ? new Validator(validationConditions, dataId)
      : undefined
  }

  toJson(): StoredPlainObject {
    return {
      type: Form.type,
      name: this.name,
      data: this.data,
      schema: this.schema.toJson(),
      view: this.view.toJson()
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
