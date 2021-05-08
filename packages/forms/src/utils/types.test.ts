
import { isBoolean, isNullOrUndefined, isString, hasLength } from './types'

describe('GIVEN we call isBoolean', () => {
  const tests = [
    { param: undefined, result: false },
    { param: null, result: false },
    { param: 'true', result: false },
    { param: 'false', result: false },
    { param: true, result: true },
    { param: false, result: true },
    { param: {}, result: false },
    { param: 1, result: false },
    { param: 0, result: false },
    { param: String(''), result: false },
    { param: [], result: false },
  ]
  for (const test of tests) {
    describe(`AND we pass ${test.param} (typeof ${typeof test.param}) as the parameter`, () => {
      it(`SHOULD return ${test.result}`, () => {
        expect(isBoolean(test.param)).toBe(test.result)
      })
    })
  }
})


describe('GIVEN we call isNullOrUndefined', () => {
  const tests = [
    { param: undefined, result: true },
    { param: null, result: true },
    { param: 'true', result: false },
    { param: 'false', result: false },
    { param: true, result: false },
    { param: false, result: false },
    { param: {}, result: false },
    { param: 1, result: false },
    { param: 0, result: false },
    { param: String(''), result: false },
    { param: [], result: false },
  ]
  for (const test of tests) {
    describe(`AND we pass ${test.param} (typeof ${typeof test.param}) as the parameter`, () => {
      it(`SHOULD return ${test.result}`, () => {
        expect(isNullOrUndefined(test.param)).toBe(test.result)
      })
    })
  }
})


describe('GIVEN we call isString', () => {
  const tests = [
    { param: undefined, result: false },
    { param: null, result: false },
    { param: 'true', result: true },
    { param: 'false', result: true },
    { param: true, result: false },
    { param: false, result: false },
    { param: {}, result: false },
    { param: 1, result: false },
    { param: 0, result: false },
    { param: String(''), result: true },
    { param: [], result: false },
  ]
  for (const test of tests) {
    describe(`AND we pass ${test.param} (typeof ${typeof test.param}) as the parameter`, () => {
      it(`SHOULD return ${test.result}`, () => {
        expect(isString(test.param)).toBe(test.result)
      })
    })
  }
})

describe('GIVEN we call hasLength', () => {
  const tests = [
    { param: undefined, result: false },
    { param: null, result: false },
    { param: 'true', result: true },
    { param: 'false', result: true },
    { param: true, result: false },
    { param: false, result: false },
    { param: {}, result: false },
    { param: 1, result: false },
    { param: 0, result: false },
    { param: String(''), result: true },
    { param: [], result: true },
  ]
  for (const test of tests) {
    describe(`AND we pass ${test.param} (typeof ${typeof test.param}) as the parameter`, () => {
      it(`SHOULD return ${test.result}`, () => {
        expect(hasLength(test.param)).toBe(test.result)
      })
    })
  }
})
