import { Form } from './form'
import { PluginDependency } from './plugin-dependency'
import {
  ITriggerConditionBuilder,
  IValidationConditionBuilder,
  StoredPlainObject,
  IViewBuilder
} from './@types'
import { semanticVersion } from './utils/versioning'

export interface IBuilders {
  validationConditions: IValidationConditionBuilder[]
  triggerConditions: ITriggerConditionBuilder[]
  views: IViewBuilder[]
}

export interface IFormsBuilder {
  builders: IBuilders
  with(plugin: IFormsBuilderPlugin): this
  fromJson(json: StoredPlainObject): Form
  checkDependencies(json: StoredPlainObject): ICheckDependenciesResult
}

export interface IFormsBuilderPlugin {
  name: string
  version: string
  register(builder: IFormsBuilder): void
  [field: string]: any
}

export interface ICheckDependenciesResult {
  canBuild: boolean
  unsatisfiedDependencies: {
    loaded: PluginDependency | undefined
    required: PluginDependency
  }[]
}

export class FormsBuilder implements IFormsBuilder {
  builders = { validationConditions: [], triggerConditions: [], views: [] }
  loadedDependencies: PluginDependency[] = []

  with(plugin: IFormsBuilderPlugin): this {
    plugin.register(this)
    this.loadedDependencies.push(
      new PluginDependency(plugin.name, plugin.version)
    )
    return this
  }

  /**
   * Check the loaded plugins to see if they will be able to hydrate the given form object
   * @param json
   * @returns CheckDependencyResult
   */
  checkDependencies(json: StoredPlainObject): ICheckDependenciesResult {
    const requiredDependencies: PluginDependency[] = json.schema.dependencies.map(
      PluginDependency.fromJson
    )
    const unsatisfiedDependencies = requiredDependencies
      .map((required) => ({
        required,
        loaded: this.loadedDependencies.find((dep) => dep.name === require.name)
      }))
      .filter(
        ({ loaded, required }) =>
          typeof loaded === 'undefined' ||
          !semanticVersion(loaded.version).isCompatibleWith(required.version)
      )

    return {
      canBuild: !unsatisfiedDependencies.length,
      unsatisfiedDependencies
    }
  }

  fromJson(json: StoredPlainObject): Form {
    return Form.fromJson(json, this.builders)
  }
}

export const makeFormBuilder = (): IFormsBuilder => new FormsBuilder()
