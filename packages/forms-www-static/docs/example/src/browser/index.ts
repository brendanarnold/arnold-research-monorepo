import { forms } from '@tngbl/forms'
import { form } from '../shared/example-form' // @todo Load form from embedded page JSON
import { PageValidationPlugin } from '../../../../src/browser'

const plugin = new PageValidationPlugin().withCore()

forms.withPlugin(plugin)

forms.plugin['page-validation'].activate(form)
