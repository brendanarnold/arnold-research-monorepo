import {
  EmailValidation,
  StringMaxLengthValidation,
  StringMinLengthValidation
} from '@tngbl/forms'
import { FieldSet, Field, Schema } from '@tngbl/forms'

const schema = new Schema()
schema.fields = [
  new Field('firstName').withValidations([
    new StringMaxLengthValidation('firstName', 6),
    new StringMinLengthValidation('firstName', 2)
  ]),
  new Field('lastName').withValidations([
    new StringMaxLengthValidation('lastName', 6),
    new StringMinLengthValidation('lastName', 2)
  ]),
  new Field('email').withValidations([new EmailValidation('email')])
]

const fieldSet = new FieldSet()
fieldSet.structure = [
  new FieldInstance('myFirstName', 'firstName'),
  new FieldInstance('myLastName', 'lastName'),
  new FieldInstance('myEmail', 'email'),
  new FieldInstance('mothersMaidenName', 'lastName')
]
fieldSet.name = 'main'

schema.structure = [fieldSet]

schema.name = 'P45'
schema.schemaVersion = '0.0.1'

const schemaJson = schema.toJson()

console.log(schemaJson)

console.log('========')

const recodedJson = Schema.fromJson(schemaJson).toJson()

console.log(recodedJson)

console.log('========')

const data = {
  main: {
    myFirstName: 'Bren',
    myLastName: 'Arnold',
    myEmail: 'blah@blah.com',
    mothersMaidenName: 'Yeo'
  }
}

const validationResult = schema.validate(data)

console.log(JSON.stringify(validationResult, null, 2))
