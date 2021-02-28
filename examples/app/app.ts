
import * as express from 'express'
import { Form, Schema, FieldSet, Field, StorageType } from '@tngbl/forms'
import { GdprPolicy, GdprDataType, GdprLifetime } from '@tngbl/secure-store'
import { StaticWebRenderer } from '@tngbl/forms-www-static'
import { Monitor } from '@tngbl/monitor'
import { StringMinLengthValidation } from '../../build/packages/forms/src'

const monitor = new Monitor()

const app = express()

app.use(express.urlencoded({ extended: false }))

app.post('/submit', (req, res) => {
  const html = `<!DOCTYPE html />
  <html>
    <head>
    </head>
    <body>
    <pre>
    ${JSON.stringify(req.body)}
    </pre>
    </body>
  </html>
  `
  res.send(html)
})

app.get('/', (req, res) => {
  const form = new Form()
  form.schema = new Schema()
  const fieldSet1 = new FieldSet()
  fieldSet1.name = 'userDetails'
  fieldSet1.label = 'User details'
  fieldSet1.structure.push(...[
    new Field('userFirstName', 'First name', StorageType.String, new GdprPolicy(GdprDataType.Anonymised, GdprLifetime.Persistent), 'firstName'),
    new Field('userLastName', 'Last name', StorageType.String, new GdprPolicy(GdprDataType.Anonymised, GdprLifetime.Persistent), 'lastName')
  ])
  form.schema.structure.push(fieldSet1)
  const fieldSet2 = new FieldSet()
  fieldSet2.name = 'newAccount'
  fieldSet2.label = 'New Account'
  fieldSet2.structure.push(...[
    new Field('newUsername', 'Username', StorageType.String, new GdprPolicy(GdprDataType.Anonymised, GdprLifetime.Persistent), 'username'),
    new Field('newPassword', 'Password', StorageType.String, new GdprPolicy(GdprDataType.Anonymised, GdprLifetime.Persistent), 'newPassword').withValidations([
      new StringMinLengthValidation('newPassword', 6)
    ])
  ])
  form.schema.structure.push(fieldSet2)
  form.data = {
    userDetails: {
      userFirstName: '',
      userLastName: ''
    },
    newAccount: {
      newUserName: 'Brendan',
      newPassword: 'password1234'
    }
  }

  const renderer = new StaticWebRenderer(form)

  const html = `<!DOCTYPE html />
<html>
  <head>
  </head>
  <body>
  ${renderer.renderHtml()}
  </body>
</html>
`
  res.send(html)
})

app.listen(3000, () => {
  monitor.trace({ message: 'Server has started ...' })
})
