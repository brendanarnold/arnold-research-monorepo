import { makeFormBuilder, core } from '@tngbl/forms'
import { pageValidation } from '../../../../src/browser'
import { hooks } from '../templates'

const builder = makeFormBuilder().with(core).with(pageValidation({ hooks }))

window['tngbl'] = {
  builder
}
