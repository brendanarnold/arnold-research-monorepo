import { StoredPlainObject } from '@tngbl/models'
import { Form } from '.'
import { IDataTriggerBuilder } from './data-triggers'
import { IValidationBuilder } from './validations'

export interface IBuilders {
  validations: Record<string, IValidationBuilder>
  dataTriggers: Record<string, IDataTriggerBuilder>
}

export interface IFormModulePlugin {
  name: string
  register: (FormModule) => void
}

export class FormModule {
  builders: IBuilders = {
    validations: {},
    dataTriggers: {}
  }

  /**
   * A namespace for plugins to drop shared functionality onto the form configuration
   */
  plugin: Record<string, any> = {}

  /**
   * Register plugin with the FormManager instance
   * @param plugin
   */
  withPlugin(plugin: IFormModulePlugin): this {
    this.plugin[plugin.name] = {}
    plugin.register(this)
    return this
  }

  withValidation(builder: IValidationBuilder): this {
    this.builders.validations[builder.name] = builder
    return this
  }

  withDataTrigger(builder: IDataTriggerBuilder): this {
    this.builders.dataTriggers[builder.name] = builder
    return this
  }

  formFromPlainObject(obj: StoredPlainObject): Form {
    // @todo
    return Form.fromPlainObj(obj, this.builders)
  }

  formToPlainObject(form: Form): StoredPlainObject {
    return form.toPlainObj()
  }
}
