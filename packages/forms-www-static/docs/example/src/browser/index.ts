import { makeFormBuilder, core } from '@tngbl/forms'
import { pageValidation } from '../../../../src/browser'
import { hooks } from '../templates'
import * as Polyglot from 'node-polyglot'
import { phrases } from '../locales/en-gb.js'

const polyglot = new Polyglot({ phrases: phrases })

const builder = makeFormBuilder().with(core).with(pageValidation({ hooks }))

window['tngbl'] = {
  builder
}
