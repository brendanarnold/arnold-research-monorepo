import { Form } from "./form"
import { Schema } from "./schema"

describe('GIVEN we instantiate a Form', () => {
  let form
  beforeEach(() => {
    form = new Form()
  })
  afterEach(() => {
    jest.resetAllMocks()
  })
  
  describe('AND the form has a Schema', () => {
    let fakeSchema
    beforeEach(() => {
      fakeSchema = {
        toPlainObject: () => 'mySchema'
      }
      form.schema = fakeSchema
    })

    describe('AND some data', () => {
      let fakeData
      beforeEach(() => {
        fakeData = { 'myData': 1 }
        form.data = fakeData
      })

      describe('AND we call validate()', () => {
        let result
        beforeEach(() => {
          fakeSchema.validate = jest.fn(() => 'schemaResult')
          result = form.validate()
        })

        it('SHOULD return the result of the schema validation', () => expect(result).toBe('schemaResult'))
        it('SHOULD call validate on the schema', () => expect(fakeSchema.validate).toHaveBeenCalled())
        it('SHOULD pass the form data to the schema validate method', () => expect(fakeSchema.validate).toHaveBeenCalledWith(form.data))
      })
      

      describe('AND we call toPlainObj()', () => {
        it('SHOULD return the expected plain object', () => {
          expect(form.toPlainObj()).toEqual({
            type: 'Form',
            data: fakeData,
            schema: 'mySchema'
          })
        })
      })
    })
    
  })
  
})
