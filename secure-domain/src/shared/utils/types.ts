
export const isNullOrUndefined = value => value === null || typeof value === 'undefined'

export const isBoolean = value => typeof value === 'boolean'

export const hasLength = value => typeof value !== 'undefined'
  && value !== null
  && value.hasOwnProperty('length')
