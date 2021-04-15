import { forms } from '@tngbl/forms'
import { PageValidationPlugin } from '../../../../src/browser'
import { hooks } from '../templates'

const plugin = new PageValidationPlugin().withCore().withHooks(hooks)

forms.withPlugin(plugin)

window['tngbl'] = {
  forms
}
