import Polyglot from 'node-polyglot'
import {
  FormModule,
  IValidation,
  IFormModulePlugin,
  Field,
  FieldSet,
  Form
} from '@tngbl/forms'
import { eventHooks as coreEventHooks } from '../templates/components'

export interface IPageValidationHook {
  componentName: string
  registerHook: (
    dataId: string,
    validator: IValidation,
    polyglot: Polyglot
  ) => void
}

export class PageValidationPlugin implements IFormModulePlugin {
  name = 'page-validation'
  formModule: FormModule
  pageValidationHooks: IPageValidationHook[] = []

  register(formModule: FormModule): void {
    this.formModule = formModule
    this.formModule.plugin['page-validation'] = this
  }

  withCore(): this {
    this.withHooks(coreEventHooks)
    return this
  }

  withHooks(hooks: IPageValidationHook[]): this {
    this.pageValidationHooks.push(...hooks)
    return this
  }

  activateFormFromJson(json: string): void {
    const form = this.formModule.formFromPlainObject(JSON.parse(json))
    this.activate(form)
  }

  activate(component: Form | FieldSet | Field): void {
    // @todo Get the proper polyglot instance
    const polyglot = new Polyglot()

    if (component instanceof Form) {
      this.activate(component.schema)
    } else if (component instanceof FieldSet) {
      component.structure.forEach((el) => this.activate(el))
    } else if (component instanceof Field) {
      this.pageValidationHooks
        .find((hook) => hook.componentName === component.viewType)
        ?.registerHook(component.name, component, polyglot)
    }
  }
}
