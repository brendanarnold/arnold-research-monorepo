import { FormData } from './form'

export interface IDataTrigger {
  isTriggered: (data: FormData) => boolean
  toJson: () => StoredPlainObject
}

export interface IDataTriggerBuilder {
  name: string
  fromJson: (
    json: StoredPlainObject,
    dataTriggerBuilders?: IDataTriggerBuilder[]
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

export type StoredPlainObject = {
  type: string
  [key: string]: any
}

export type UUID = string
export type Json = string
export type SemVer = string
export type IntVer = number
