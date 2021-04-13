import { SemVer, IntVer } from '@tngbl/models'
import { StoredPlainObject } from '@tngbl/models'
import type { IBuilders } from '../../form-module'
import { FieldSet } from './fieldset'

/**
 * Represents the structure of a form
 */
export class Schema extends FieldSet {
  /** Increment when make a breaking change to persistence marshalling */
  static readonly storageVersion: IntVer = 1
  static readonly type: string = 'Schema'

  schemaVersion: SemVer

  toPlainObject(): StoredPlainObject {
    const obj = super.toPlainObject()
    obj.type = Schema.type
    obj.schemaVersion = this.schemaVersion
    return obj
  }

  static fromPlainObject(obj: any, builders: IBuilders): Schema {
    const schema = FieldSet.fromPlainObject(obj, builders) as Schema
    schema.schemaVersion = obj.schemaVersion
    schema.name = obj.name

    return schema
  }
}
