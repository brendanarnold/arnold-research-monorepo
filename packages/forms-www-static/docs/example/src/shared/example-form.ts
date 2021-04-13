import { GdprDataType, GdprLifetime, GdprPolicy } from '@tngbl/secure-store'
import { Form, Schema, Field, StorageType } from '@tngbl/forms'

// Ordinarily this would be generated from JSON or pulled from a database ...

export const form = new Form()
form.data = {
  'user-password': 'password1'
}
form.schema = new Schema()
form.schema.name = 'main'
form.schema.schemaVersion = '1.0.0'
form.schema.structure = [
  new Field(
    'user-password',
    'Your Password',
    StorageType.String,
    new GdprPolicy(GdprDataType.SensitivePersonal, GdprLifetime.Persistent),
    'new-password'
  )
]
