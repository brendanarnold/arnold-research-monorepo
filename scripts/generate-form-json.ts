import { Form, Schema, Field, MinLengthValidation } from '@tngbl/forms'

// Ordinarily this would be generated from JSON or pulled from a database ...

export const form = new Form()
form.data = {
  'user-password': 'password1'
}
form.schema = new Schema()
form.schema.name = 'main'
form.schema.schemaVersion = '1.0.0'
form.schema.structure = [
  new Field('user-password', 'Your Password', 'new-password')
]

const validation = new MinLengthValidation(3)

console.log(JSON.stringify(validation.toJson(), null, 2))
