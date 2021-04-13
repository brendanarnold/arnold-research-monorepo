import { Form, FormModule, IFormModulePlugin } from '@tngbl/forms'
import { FormViewModel } from './static-page-plugin.view-model'
import * as nunjucks from 'nunjucks'

// const templateLookup = {
//   form: 'form.njk',
//   'form-section': 'form-section.njk',
//   'form-sub-section': 'form-sub-section.njk',
//   'new-password': 'new-password.njk'
// }

export class StaticPageRendererPlugin implements IFormModulePlugin {
  name = 'static-page-renderer'
  templateDirs: string[] = []

  constructor() {
    this.templateDirs.push(__dirname + '/../templates')
  }

  withTemplateDir(dir: string): this {
    this.templateDirs.push(dir)
    return this
  }

  register(formModule: FormModule): void {
    formModule.plugin[this.name] = {
      renderHtml: (form: Form) => {
        nunjucks.configure(this.templateDirs, {
          autoescape: true
        })

        const viewModel = {
          form: FormViewModel.fromForm(form)
        }

        const html = nunjucks.render('form.njk', viewModel)

        return html
      }
    }
  }
}
