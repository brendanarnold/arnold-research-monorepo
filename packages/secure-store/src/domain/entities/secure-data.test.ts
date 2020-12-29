
import { GdprDataType, GdprPolicy } from './secure-data'

describe('GIVEN we instantiate a GdprPolicy', () => {
  let subject, params
  beforeEach(() => {
    params = {}
  })
  describe('AND the lifetime is undefined', () => {
    beforeEach(() => {
      params.lifetime = undefined
    })
    describe('AND the policy is undefined', () => {
      beforeEach(() => {
        params.gdprDataType = undefined
        subject = new GdprPolicy(params.gdprDataType, params.lifetime)
      })
      describe('AND we call toPlainObject', () => {
        it('SHOULD return a plain object of the right form', () => {
          expect(subject.toPlainObject()).toEqual({
            type: 'GdprPolicy',
            lifetime: undefined,
            gdprDataType: undefined
          })
        })
      })
      
    })
  })
})
