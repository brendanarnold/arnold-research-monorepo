import { StaticWebRenderer } from '@tngbl/forms-www-static'
import { FieldSet, Form, Schema } from '@tngbl/forms'
import { Field, StorageType } from '@tngbl/forms'
import { GdprPolicy, GdprDataType, GdprLifetime } from '@tngbl/secure-store'


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

console.log(renderer.renderHtml())
