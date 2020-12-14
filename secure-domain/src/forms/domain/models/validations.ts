import { i18n } from '../../localisation'

import { hasLength } from "../../../shared/utils/types"


export interface Validation {
  type: ValidationType

  validate: (data: { [index: string]: any }) => ValidationResult

  toPlainObject: () => {
    type: string,
    [customFields: string]: any
  }
}

export class ValidationError {
  fields: string[]
  type: ValidationType
  errorString: string

  constructor (fields: string[], type: ValidationType, errorString: string) {
    this.fields = fields
    this.type = type
    this.errorString = errorString
  }
}

export class ValidationResult {
  get isValid () { return !!this.errors.length }
  errors: ValidationError[] = []
}


export enum ValidationType {
  Email = 'EMAIL',
  StringMaxLength = 'STRING_MAX_LENGTH',
  StringMinLength = 'STRING_MIN_LENGTH',
  All = 'ALL',
  Match = 'MATCH'
}


export class StringMinLengthValidation implements Validation {
  type = ValidationType.StringMinLength
  name: string
  length: number

  constructor (name: string, length: number) {
    this.name = name
    this.length = length
  }

  validate (data) {
    const result = new ValidationResult()
    if (!hasLength(data)) {
      return result
    }

    if (data.length < this.length) {
      const errorString = i18n.__('Minimum length is {{ length }} characters', { length: this.length })
      result.errors.push(new ValidationError([this.name], ValidationType.StringMinLength, errorString))
    }

    return result
  }

  toPlainObject () {
    return {
      name: this.name,
      type: this.type,
      length: this.length,
    }
  }
}

export class StringMaxLengthValidation implements Validation {
  type = ValidationType.StringMaxLength
  name: string
  length: number

  constructor (name: string, length: number) {
    this.name = name
    this.length = length
  }

  validate (data) {
    const result = new ValidationResult()
    if (!hasLength(data)) {
      return result
    }

    if (data.length > this.length) {
      const errorString = i18n.__('Maximum length is {{ length }} characters', { length: this.length })
      result.errors.push(new ValidationError([this.name], ValidationType.StringMaxLength, errorString))
    }

    return result
  }

  toPlainObject () {
    return {
      name: this.name,
      type: this.type,
      length: this.length,
    }
  }
}


export class EmailValidation implements Validation {
  type = ValidationType.Email
  name: string

  constructor (name: string) {
    this.name = name
  }

  validate (data) {
    const emailRegex = /^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
    const result = new ValidationResult()
    if (!emailRegex.test(data)) {
      const errorString = i18n.__('Not a valid email address')
      const error = new ValidationError([this.name], this.type, errorString)
      result.errors.push(error)
    }
    return result
  }

  toPlainObject () {
    return {
      name: this.name,
      type: this.type
    }
  }
}

