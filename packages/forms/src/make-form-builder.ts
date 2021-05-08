import { Form } from './form'
import {
  IDataTriggerBuilder,
  IValidationBuilder,
  StoredPlainObject
} from './types'

export interface IBuilders {
  validations: IValidationBuilder[]
  dataTriggers: IDataTriggerBuilder[]
}

export interface IFormsBuilder {
  builders: IBuilders
  with(plugin: IFormsBuilderPlugin): this
  fromJson(json: StoredPlainObject): Form
}

export interface IFormsBuilderPlugin {
  register(builder: IFormsBuilder): void
  [field: string]: any
}

export class FormsBuilder implements IFormsBuilder {
  builders = { validations: [], dataTriggers: [] }

  with(plugin: IFormsBuilderPlugin): this {
    plugin.register(this)
    return this
  }

  fromJson(json: StoredPlainObject): Form {
    return Form.fromJson(json, this.builders)
  }
}

export const makeFormBuilder = (): IFormsBuilder => new FormsBuilder()
