
import { Form, Schema, FieldSet, Field, StorageType } from '@tngbl/forms'
import { GdprPolicy, GdprDataType, GdprLifetime } from '@tngbl/secure-store'
import * as express from 'express'
import { StaticWebRenderer } from '../../StaticWebRenderer'
import { Monitor } from '@tngbl/monitor'

const monitor = new Monitor()

const app = express()

app.get('/', (req, res) => {
  const form = new Form()
  form.schema = new Schema()
  const fieldSet = new FieldSet()
  fieldSet.name = 'section1'
  fieldSet.label = 'Section 1'
  form.schema.structure.push(fieldSet)
  form.data = {
    section1: {},
    userFirstName: 'Brendan'
  }
  const field = new Field('userFirstName', 'First name', StorageType.String, new GdprPolicy(GdprDataType.Anonymised, GdprLifetime.Persistent), 'firstName')
  form.schema.structure.push(field)

  const renderer = new StaticWebRenderer(form)

  res.send(renderer.renderHtml())
})

app.listen(3000, () => {
  monitor.trace({ message: 'Server has started ...' })
})
