import { FormData } from '../form'

export type Builder =
  | IValidationConditionBuilder
  | ITriggerConditionBuilder
  | IViewBuilder

export interface ITriggerCondition {
  isTriggered: (id: string, data: FormData) => boolean
  toJson(): StoredPlainObject
}

export interface ITriggerConditionBuilder {
  type: string
  fromJson(json: StoredPlainObject, builders?: Builder[]): ITriggerCondition
}

export interface IView {
  /**
   * Locale e.g. 'en-gb'
   */
  locale: string
  translate(item: ITranslatable): string
  toJson(): StoredPlainObject
}

export interface IViewBuilder {
  type: string
  fromJson(json: StoredPlainObject, builders?: Builder[]): IView
}

export interface IValidationCondition {
  validate: (id: string | undefined, data: FormData) => IValidationError[]
  toJson(): StoredPlainObject
}

export interface IValidationConditionBuilder {
  type: string
  fromJson(json: StoredPlainObject, builders?: Builder[]): IValidationCondition
}

export interface ITranslatable {
  translateKey: string
  translateVars?: Record<string, any> | undefined
}

export interface IValidationError extends ITranslatable {
  dataId: string
  validation: string
  error: string
}

export interface StoredPlainObject {
  type: string
  [key: string]: any
}

export interface StringTree {
  [key: string]: string | StringTree
}

export type UUID = string
export type Json = string
export type SemVer = string
export type IntVer = number
