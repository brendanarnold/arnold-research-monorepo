import {
  makeFormBuilder,
  core,
  gdpr,
  permissions,
  IFormsBuilderPlugin
} from '@tngbl/forms'

const myValidations: IFormsBuilderPlugin = {
  register(builder) {
    builder.builders.validations.push(
      ...[
        // @todo Some custom validation builders here ...
      ]
    )
  }
}

interface JsonObject {
  type: string
  [key: string]: any
}

type FormData = Record<string, any>

interface FormSchema {
  i18n: Record<string, any>
  structure: Record<string, any>
  toJson(): JsonObject
  validate(): ValidationError[]
}

interface Form {
  name: string
  data: FormData
  schema: FormSchema
  view: FormView
  toJson(): JsonObject
}

interface FormsBuilder {
  with(FormsBuilderPlugin): this
  fromJson(SerializedObject): Form
}

interface ValidationError {
  dataName: string
  translationKey: string
  translationVars: Record<string, unknown>
  text: string
}

interface StringTree {
  [key: string]: string | StringTree
}

interface FormView {
  translations: StringTree
  translate(item: ITranslatable)
}

const formBuilder = makeFormBuilder()
  .with(core.validations)
  .with(myValidations)
  .with(gdpr)
  .with(permissions)

const json = {} // @todo Some form Json

const form = formBuilder.fromJson(json)

const formErrors = form.validate().map((error) => error.text)

const formErrors = form.validate().map((error) => form.translate(error))
// .map((error) => polyglot.t(error.translationKey, error.translationVars))

const favColourErrors = form
  .validatorFor('fav-color')
  .validate()
  .map((error) => form.translate(error))
  .map((error) => error.translateTo('en-gb'))

form.schema
form.data
form.viewModel
