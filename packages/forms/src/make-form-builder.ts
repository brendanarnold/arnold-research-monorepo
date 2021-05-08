import { StoredPlainObject } from '@tngbl/models'
import { Form } from './form'
import { IValidationBuilder } from './types'

export interface IBuilders {
  validations: IValidationBuilder[]
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
  builders = { validations: [] }

  with(plugin: IFormsBuilderPlugin): this {
    plugin.register(this)
    return this
  }

  fromJson(json: StoredPlainObject): Form {
    return Form.fromJson(json, this.builders)
  }
}

export const makeFormBuilder = (): IFormsBuilder => new FormsBuilder()
