import { forms } from '@tngbl/forms'
import { PageValidationPlugin } from '../../../../src/browser'

const plugin = new PageValidationPlugin().withCore()

forms.withPlugin(plugin)

window['tngbl'] = {
  forms
}
