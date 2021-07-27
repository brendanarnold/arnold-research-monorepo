import { Form } from './form'
import {
  ITriggerConditionBuilder,
  IValidationConditionBuilder,
  StoredPlainObject,
  IViewBuilder
} from './@types'

export interface IBuilders {
  validationConditions: IValidationConditionBuilder[]
  triggerConditions: ITriggerConditionBuilder[]
  views: IViewBuilder[]
}

export interface IFormsBuilder {
  builders: IBuilders
  with(plugin: IFormsBuilderPlugin): this
  fromJson(json: StoredPlainObject): Form
}

export interface IFormsBuilderPlugin {
  name: string
  version: string
  register(builder: IFormsBuilder): void
  [field: string]: any
}

export class FormsBuilder implements IFormsBuilder {
  builders = { validationConditions: [], triggerConditions: [], views: [] }

  with(plugin: IFormsBuilderPlugin): this {
    plugin.register(this)
    return this
  }

  fromJson(json: StoredPlainObject): Form {
    return Form.fromJson(json, this.builders)
  }
}

export const makeFormBuilder = (): IFormsBuilder => new FormsBuilder()
