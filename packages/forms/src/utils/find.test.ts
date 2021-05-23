import { Field } from '../field'
import { Trigger } from '../trigger'
import { FieldSet } from '../fieldset'
import { Schema } from '../schema'
import { findInData, findInForm } from './find'

describe('findInData()', () => {
  let params
  beforeEach(() => {
    params = {
      data: undefined,
      dataId: undefined
    }
  })

  describe('Given a nested FormData object as the data', () => {
    beforeEach(() => {
      params.data = {
        foo: 1,
        bar: true,
        baz: undefined,
        flim: null,
        flam: {
          boo: 'Boo',
          goo: ['a', 'b', 'c']
        }
      }
    })

    describe('and a dataId that exists in the data', () => {
      beforeEach(() => {
        params.dataId = 'foo'
      })

      it('should return the right value', () =>
        expect(findInData(params.data, params.dataId)).toEqual(1))
    })

    describe('and a dataId that does not exist in the data', () => {
      beforeEach(() => {
        params.dataId = 'a-non-existant-key'
      })

      it('should return undefined', () =>
        expect(findInData(params.data, params.dataId)).toBeUndefined())
    })

    describe('and a dataId that exists but refers to an undefined value', () => {
      beforeEach(() => {
        params.dataId = 'baz'
      })

      it('should return undefined', () =>
        expect(findInData(params.data, params.dataId)).toBeUndefined())
    })
  })
})

describe('findInForm()', () => {
  let params: any
  let mocks: any
  beforeEach(() => {
    params = {
      item: undefined,
      name: undefined
    }
    mocks = {}
  })

  describe('and a nested form schema is passed in', () => {
    beforeEach(() => {
      mocks.schema = new Schema()
      mocks.field = new Field(
        'a-field-name',
        'A field label',
        'a-view-type',
        Trigger.AlwaysTrue
      )
      mocks.anotherField = new Field(
        'another-field-name',
        'Another field label',
        'a-view-type',
        Trigger.AlwaysTrue
      )
      mocks.nestedField = new Field(
        'a-nested-field-name',
        'A nested field label',
        'a-view-type',
        Trigger.AlwaysTrue
      )
      mocks.fieldset = new FieldSet()
      mocks.fieldset.name = 'a-fieldset-name'
      mocks.fieldset.structure = [mocks.nestedField]
      mocks.schema.structure = [mocks.field, mocks.anotherField, mocks.fieldset]
      params.item = mocks.schema
    })

    describe('and a name that belongs to a nested field is passed in', () => {
      beforeEach(() => {
        params.dataId = 'a-nested-field-name'
      })

      it('should return the field corresponding to the name', () =>
        expect(findInForm(params.item, params.dataId)).toBe(mocks.nestedField))
    })

    describe('and a name that belongs to a field is passed in', () => {
      beforeEach(() => {
        params.dataId = 'a-field-name'
      })

      it('should return the field corresponding to the name', () =>
        expect(findInForm(params.item, params.dataId)).toBe(mocks.field))
    })

    describe('and a name that belongs to a fieldset is passed in', () => {
      beforeEach(() => {
        params.dataId = 'a-fieldset-name'
      })

      it('should return the fieldset corresponding to the name', () =>
        expect(findInForm(params.item, params.dataId)).toBe(mocks.fieldset))
    })
  })
})
