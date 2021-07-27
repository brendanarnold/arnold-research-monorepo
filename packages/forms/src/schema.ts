import { SemVer, IntVer, StoredPlainObject } from './@types'
import type { IBuilders } from './make-form-builder'
import { FieldSet } from './fieldset'

class PluginDependency {
  name: string
  version: string

  toJson(): StoredPlainObject {
    return {
      type: PluginDependency.name,
      name: this.name,
      version: this.version
    }
  }
}

/**
 * Represents the structure of a form
 */
export class Schema extends FieldSet {
  static readonly type: string = 'Schema'
  dependencies: PluginDependency[] = []

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
