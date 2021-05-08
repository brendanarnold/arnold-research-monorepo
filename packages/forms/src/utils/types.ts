export const isNullOrUndefined = (value: any): boolean =>
  value === null || typeof value === 'undefined'

export const isBoolean = (value: any): boolean => typeof value === 'boolean'

export const hasLength = (value: any): boolean =>
  typeof value !== 'undefined' &&
  value !== null &&
  Object.prototype.hasOwnProperty.call(value, 'length')

export const isString = (value: any): boolean =>
  typeof value === 'string' || value instanceof String

export const isNumber = (value: any): boolean => typeof value === 'number'
