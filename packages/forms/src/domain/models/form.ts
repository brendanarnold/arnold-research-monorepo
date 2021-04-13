import { Schema } from './schema'
import { StoredPlainObject } from '@tngbl/models'
import { IValidationError } from '../../validations'
import type { IBuilders } from '../../form-module'

export type FormData = any

/**
 * Object that contains the data alongside the schema
 */
export class Form {
  static type = 'Form'

  name: string
  data: FormData = {}
  schema: Schema

  validate(): IValidationError[] {
    return this.schema.validate('', this.data)
  }

  toPlainObj(): StoredPlainObject {
    return {
      type: Form.type,
      name: this.name,
      data: this.data,
      schema: this.schema.toPlainObject()
    }
  }

  static fromPlainObj(obj: any, builders: IBuilders): Form {
    const form = new Form()
    form.data = obj.data
    form.name = obj.name
    form.schema = Schema.fromPlainObject(obj.schema, builders)
    return form
  }
}
