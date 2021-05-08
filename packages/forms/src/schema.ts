import { SemVer, IntVer, StoredPlainObject } from './types'
import type { IBuilders } from './make-form-builder'
import { FieldSet } from './fieldset'

/**
 * Represents the structure of a form
 */
export class Schema extends FieldSet {
  /** Increment when make a breaking change to persistence marshalling */
  static readonly storageVersion: IntVer = 1
  static readonly type: string = 'Schema'

  schemaVersion: SemVer

  toJson(): StoredPlainObject {
    const obj = super.toJson()
    obj.type = Schema.type
    obj.schemaVersion = this.schemaVersion
    return obj
  }

  static fromJson(json: StoredPlainObject, builders: IBuilders): Schema {
    const schema = FieldSet.fromJson(json, builders) as Schema
    schema.schemaVersion = json.schemaVersion
    schema.name = json.name

    return schema
  }
}
