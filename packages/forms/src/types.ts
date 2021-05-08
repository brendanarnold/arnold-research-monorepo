import { StoredPlainObject } from '@tngbl/models'
import { FormData } from './form'

export interface IDataTrigger {
  isTriggered: (data: FormData) => boolean
  toPlainObject: () => StoredPlainObject
}

export interface IDataTriggerBuilder {
  name: string
  fromPlainObject: (
    obj: StoredPlainObject,
    dataTriggerBuilders?: Record<string, IDataTriggerBuilder>
  ) => IDataTrigger
}

export interface IValidation {
  validate: (id: string, data: FormData) => IValidationError[]
  toJson: () => StoredPlainObject
}

export interface IValidationBuilder {
  name: string
  fromJson: (
    json: StoredPlainObject,
    validationBuilders?: IValidationBuilder[]
  ) => IValidation
}

export interface IValidationError {
  dataId: string
  text: string
  translationKey: string
  translationVars: Record<string, any> | undefined
  error: string
  validation: string
}
