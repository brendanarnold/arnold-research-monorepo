import { Form } from './form'
import { StoredPlainObject, Builder } from './@types'
import { PluginDependency } from './plugin-dependency'

export interface IFormsBuilder {
  withBuilders(
    builders: Builder[],
    name: string,
    fromPackage: string,
    version: string
  )
  with(plugin: IFormsBuilderPlugin): this
  fromJson(json: StoredPlainObject): Form
}

export interface IFormsBuilderPlugin {
  /**
   * If true, this plugin will be included in serialised form schema. This signifies that the form cannot
   * be rebuilt from JSON without this package
   */
  isBuildDependency?: boolean
  /**
   * The NPM package name that contains this plugin. Leave undefined if plugin is not in a package
   */
  fromPackage: string | undefined
  /**
   * The human readable name of the plugin. e.g. 'core' or 'core.validations'
   */
  name: string
  /**
   * Semantic version - major releases reserved for where forms built with previous versions cannot be
   * built with this new version
   */
  version: string
  register(builder: IFormsBuilder): void
  [field: string]: any
}

export type BuilderWithDependency = Builder & { _package: PluginDependency }

export class FormsBuilder implements IFormsBuilder {
  private builders: BuilderWithDependency[] = []

  plugins: IFormsBuilderPlugin[] = []

  withBuilders(
    builders: Builder[],
    name: string,
    fromPackage: string,
    version: string
  ): this {
    this.builders.push(
      ...builders.map((builder: BuilderWithDependency) => {
        builder._package = new PluginDependency(name, fromPackage, version)
        return builder
      })
    )
    return this
  }

  with(plugin: IFormsBuilderPlugin): this {
    plugin.register(this)
    this.plugins.push(plugin)
    return this
  }

  fromJson(json: StoredPlainObject): Form {
    const form = Form.fromJson(json, this.builders)
    // Overwrite the original dependencies since any new persistence will be with the new plugin versions
    form.schema.dependencies = this.plugins
      .filter((plugin) => plugin.isBuildDependency)
      .map(
        (plugin) =>
          new PluginDependency(
            plugin.name,
            plugin.fromPackage || '',
            plugin.version
          )
      )
    return form
  }
}

export const makeFormBuilder = (): IFormsBuilder => new FormsBuilder()
