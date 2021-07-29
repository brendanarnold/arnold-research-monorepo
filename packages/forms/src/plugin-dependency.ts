import { StoredPlainObject } from './@types'

export class PluginDependency {
  constructor(
    public fromPackage: string,
    public name: string,
    public version: string
  ) {}

  toJson(): StoredPlainObject {
    return {
      type: PluginDependency.name,
      fromPackage: this.fromPackage,
      name: this.name,
      version: this.version
    }
  }

  static fromJson(json: StoredPlainObject): PluginDependency {
    return new PluginDependency(json.name, json.fromPackage, json.version)
  }
}
