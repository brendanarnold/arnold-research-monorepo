import { IFormsBuilderPlugin, Form, FieldSet, Field } from '@tngbl/forms'
import { eventHooks as coreEventHooks } from '../templates'

declare module '@tngbl/forms' {
  interface Form {
    /**
     * Binds all page bindings relevant to the form instance
     *
     * Added by the @tngbl/forms-nunjucks plugin
     */
    bindToPage(): void
  }
}

export interface IPageValidationHookArgs {
  dataId: string
  form: Form
}

export interface IPageValidationHook {
  componentName: string
  register: (args: IPageValidationHookArgs) => void
}

export interface PageValidationPluginOptions {
  hooks: IPageValidationHook[]
}

export const pageValidation = (
  opts: PageValidationPluginOptions
): IFormsBuilderPlugin => {
  const hooks = [...coreEventHooks, ...(opts.hooks || [])]

  return {
    register(): void {
      Form.prototype.bindToPage = function () {
        const _bind = (component: Form | FieldSet | Field): void => {
          if (component instanceof Form) {
            _bind(component.schema)
          } else if (component instanceof FieldSet) {
            component.structure.forEach(_bind)
          } else if (component instanceof Field) {
            const hook = hooks.find(
              (hook) => hook.componentName === component.viewType
            )
            if (!hook) throw Error(`Missing hook named ${component.viewType}`)
            hook.register({
              dataId: component.name,
              form: this
            })
          } else {
            throw new Error(`Unexpected item in form structure ${component}`)
          }
        }
        _bind(this)
      }
    }
  }
}
