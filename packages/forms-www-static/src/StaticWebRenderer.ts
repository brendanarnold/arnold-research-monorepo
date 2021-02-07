
import { Form } from '@tngbl/forms'
import { FormViewModel } from './StaticWebRenderer.viewModel'
import * as nunjucks from 'nunjucks'

const templateLookup = {
  'form': 'form.njk',
  'form-section': 'form-section.njk',
  'form-sub-section': 'form-sub-section.njk',
  'firstName': 'first-name.njk',
  'lastName': 'last-name.njk'
}




export class StaticWebRenderer {

  form: Form

  constructor (form: Form) {
    this.form = form
  }

  renderHtml (): string {

    const templateDir = __dirname + '/../src/templates'

    nunjucks.configure(templateDir, {
      autoescape: true
    })

    const viewModel = {
      form: FormViewModel.fromForm(this.form)
    }

    const html = nunjucks.render('form.njk', viewModel)

    return html
  }

}
