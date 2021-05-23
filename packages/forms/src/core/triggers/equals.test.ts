import { EqualsTriggerCondition, builder } from './equals'

const buildEquals = (params) =>
  new EqualsTriggerCondition(params.left, params.right)

describe('Equals()', () => {
  let params
  beforeEach(() => {
    params = {
      left: undefined,
      right: undefined,
      data: {},
      dataId: undefined
    }
  })

  describe('and left is set to the number 1', () => {
    beforeEach(() => {
      params.left = 1
    })

    describe('and we have basic form data', () => {
      beforeEach(() => {
        params.data = {
          'an-id': 2,
          'another-id': 1
        }
      })

      describe('and this field value is 2 in the form data', () => {
        beforeEach(() => {
          params.dataId = 'an-id'
        })

        it('should return false when isTriggered() is called', () =>
          expect(
            buildEquals(params).isTriggered(params.dataId, params.data)
          ).toBe(false))
      })

      describe('and this field value is 1 in the form data', () => {
        beforeEach(() => {
          params.dataId = 'another-id'
        })

        it('should return true when isTriggered() is called', () =>
          expect(
            buildEquals(params).isTriggered(params.dataId, params.data)
          ).toBe(true))
      })
    })
  })

  describe('and left is set to a form reference with different ID to this field', () => {
    beforeEach(() => {
      params.dataId = 'this-data-id'
      params.left = {
        dataId: 'another-id'
      }
    })

    describe('and this value matches the the left form value', () => {
      beforeEach(() => {
        params.data = {
          'this-data-id': 'some data',
          'another-id': 'some data'
        }
      })

      it('should return true when isTriggered() is called', () =>
        expect(
          buildEquals(params).isTriggered(params.dataId, params.data)
        ).toBe(true))
    })

    describe('and right is set to a form reference with a third ID', () => {
      beforeEach(() => {
        params.right = {
          dataId: 'a-third-id'
        }
      })

      describe('and the left/right form values match', () => {
        beforeEach(() => {
          params.data = {
            'this-id': false,
            'another-id': 'some value',
            'a-third-id': 'some value'
          }
          params.dataId = 'this-id'
        })

        it('should return true when isTriggered() is called', () =>
          expect(
            buildEquals(params).isTriggered(params.dataId, params.data)
          ).toBe(true))
      })
    })

    describe('and right is set to a string', () => {
      beforeEach(() => {
        params.right = 'trigger value'
      })

      describe('and the left value matches right string', () => {
        beforeEach(() => {
          params.data = {
            'another-id': 'trigger value'
          }
        })

        it('should return true when isTriggered() is called', () =>
          expect(
            buildEquals(params).isTriggered(params.dataId, params.data)
          ).toBe(true))
      })
    })
  })
})
