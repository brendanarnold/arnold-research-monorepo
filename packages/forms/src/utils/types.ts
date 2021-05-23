export const isNullOrUndefined = (value: any): boolean =>
  value === null || typeof value === 'undefined'

export const isBoolean = (value: any): boolean => typeof value === 'boolean'

export const hasProperty = (obj: any, prop: string): boolean =>
  typeof obj !== 'undefined' &&
  obj !== null &&
  Object.prototype.hasOwnProperty.call(obj, prop)

export const hasLength = (value: any): boolean => hasProperty(value, 'length')

export const isString = (value: any): boolean =>
  typeof value === 'string' || value instanceof String

export const isNumber = (value: any): boolean => typeof value === 'number'
