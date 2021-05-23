import { FieldSet } from '../fieldset'
import { Field } from '../field'
import { FormData } from '../form'
import { isNullOrUndefined } from './types'

export const findInForm = (
  item: Field | FieldSet,
  name: string
): Field | FieldSet | undefined => {
  if (item.name === name) {
    return item
  }
  if (item instanceof Field) {
    return undefined
  }
  if (item instanceof FieldSet) {
    for (const subItem of item.structure) {
      const result = findInForm(subItem, name)
      if (result) {
        return result
      }
    }
  }
}

export const findInData = (
  data: FormData,
  dataId: string
): FormData | undefined => {
  if (isNullOrUndefined(data)) {
    throw new TypeError('data is null or undefined')
  }

  const _findInObject = (
    obj: Record<string, any>,
    dataId: string
  ): FormData => {
    if (Object.hasOwnProperty.call(obj, dataId)) {
      return obj[dataId]
    } else {
      return Object.values(obj).find(
        (child) =>
          child &&
          Object.getPrototypeOf(child) === Object.prototype &&
          typeof _findInObject(child, dataId) !== 'undefined'
      )
    }
  }

  return _findInObject(data, dataId)
}
