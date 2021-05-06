import { forms } from '@tngbl/forms'
import { PageValidationPlugin } from '../../../../src/browser'
import { hooks } from '../templates'
import * as Polyglot from 'node-polyglot'
import { phrases } from '../locales/en-gb.js'

const polyglot = new Polyglot({ phrases: phrases })

const plugin = new PageValidationPlugin(polyglot).withCore().withHooks(hooks)

forms.withPlugin(plugin)

window['tngbl'] = {
  forms
}
