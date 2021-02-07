import { Schema } from "./schema"
import { ValidationResult } from "./validations"
import { Json, StoredPlainObject } from '@tngbl/models'

/**
 * Object that contains the data alongside the schema
 */
export class Form {
  static type: string = 'Form'

  data: object = {}
  schema: Schema

  validate (): ValidationResult {
    return this.schema.validate(this.data)
  }

  toPlainObj (): StoredPlainObject {
    return {
      type: Form.type,
      data: this.data,
      schema: this.schema.toPlainObject()
    }
  }

  static fromPlainObj (obj: any): Form {
    const form = new Form()
    form.data = obj.data
    form.schema = Schema.fromPlainObject(obj.schema)
    return form
  }

  toJson (): Json {
    return JSON.stringify(this.toPlainObj())  
  }

  static fromJson (json: Json): Form {
    return Form.fromPlainObj(JSON.parse(json))
  }
}
