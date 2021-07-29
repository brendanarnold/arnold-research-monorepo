import {
  makeFormBuilder,
  core,
  gdpr,
  permissions,
  IFormsBuilderPlugin,
  IView
} from '@tngbl/forms'

const myValidations: IFormsBuilderPlugin = {
  fromPackage: '@tngbl/forms-nunjucks',
  name: 'myValidations',
  version: '0.0.0',
  register(builder) {
    builder.withBuilders(
      [
        // @todo Some custom validation builders here ...
      ],
      'myValidations',
      '@tngbl/forms-nunjucks',
      '0.0.0'
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
  view: IView
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

type Storable = string | number | boolean | null | undefined

interface KeyedStorables {
  [key: string]: Storable | Storable[] | KeyedStorables
}

const formBuilder = makeFormBuilder()
  .with(core.validations)
  .with(myValidations)
  .with(gdpr)
  .with(permissions)

const json = { type: 'Form' } // @todo Some form Json

const form = formBuilder.fromJson(json)

const formErrors = form.validator
  .validate()
  .map((error) => form.view.translate(error))

const favColourErrors = form
  .validatorFor('fav-color')
  .validate()
  .map((error) => form.view.translate(error))

form.schema.itemFor('fav-color').isRequired.forData(form.data)

form.view.locale
form.schema.isRequired.forData(form.data)
form.data
form.view
