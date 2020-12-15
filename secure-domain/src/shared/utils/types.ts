
export const isNullOrUndefined = value => value === null || typeof value === 'undefined'

export const isBoolean = value => typeof value === 'boolean'

export const hasLength = value => typeof value !== 'undefined'
  && value !== null
  && value.hasOwnProperty('length')

export const isString = value => typeof value === 'string' || value instanceof String

export const isNumber = value => typeof value === 'number'
