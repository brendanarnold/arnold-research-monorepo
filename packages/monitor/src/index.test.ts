
import { Monitor } from './index'

describe('GIVEN we instantiate Monitor', () => {
  let subject, params
  beforeEach(() => {
    params = {}
    subject = new Monitor()
  })
  describe('AND we call withTags', () => {
    beforeEach(() => {
      params.tags = ['tag1', 'tag2']
      subject = subject.withTags(params.tags)
    })
    it('SHOULD add the passed tags to the .tags property', () => {
      expect(subject.tags).toEqual(params.tags)
    })
    
  })
  
})
