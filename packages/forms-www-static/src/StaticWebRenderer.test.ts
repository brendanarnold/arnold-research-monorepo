import { assert } from "console"
import { StaticWebRenderer } from './StaticWebRenderer'

describe('GIVEN we instantiate StaticWebRenderer', () => {
  let renderer, mockForm
  beforeEach(() => {
    mockForm = {}
    renderer = new StaticWebRenderer(mockForm)
  })

  describe('AND we call renderHtml()', () => {
    it('SHOULD ...', () => {
      expect(true).toBe(true)
    })
  })
})

