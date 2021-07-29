import { SemVer, StoredPlainObject, Builder } from './@types'
import { FieldSet } from './fieldset'
import { PluginDependency } from './plugin-dependency'

/**
 * Represents the structure of a form
 */
export class Schema extends FieldSet {
  static readonly type: string = 'Schema'

  /** Details plugins necessary to process this schema */
  dependencies: PluginDependency[] = []

  /** The revision version of this schema */
  schemaVersion: SemVer

  toJson(): StoredPlainObject {
    const obj = super.toJson()
    obj.type = Schema.type
    obj.schemaVersion = this.schemaVersion
    obj.dependencies = this.dependencies.map((dependency) =>
      dependency.toJson()
    )
    return obj
  }

  static fromJson(json: StoredPlainObject, builders: Builder[]): Schema {
    let schema = new Schema()
    schema = super._populateFromJson(schema, json, builders) as Schema
    schema.schemaVersion = json.schemaVersion
    schema.name = json.name
    schema.dependencies = json.dependencies.map((depJson) =>
      PluginDependency.fromJson(depJson)
    )
    return schema
  }
}
