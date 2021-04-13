import { StoredPlainObject } from '@tngbl/models'
import { FormData } from '../domain/models'

export interface IValidation {
  validate: (id: string, data: FormData) => IValidationError[]
  toPlainObject: () => StoredPlainObject
}

export interface IValidationBuilder {
  name: string
  fromPlainObject: (
    obj: StoredPlainObject,
    validationBuilders?: Record<string, IValidationBuilder>
  ) => IValidation
}

export interface IValidationError {
  dataId: string
  validationName: string
  errorName: string
}
