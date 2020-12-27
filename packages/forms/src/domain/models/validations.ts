import { i18n } from '../../localisation'

import { hasLength } from '@tngbl/utils'


export interface IValidation {
  validate: (data: { [index: string]: any }) => ValidationResult
  toPlainObject: () => object
}


export class ValidationError {
  fields: string[]
  validationType: string
  errorString: string

  constructor (fields: string[], validationType: string, errorString: string) {
    this.fields = fields
    this.validationType = validationType
    this.errorString = errorString
  }
}


export class ValidationResult {
  get isValid () { return !!this.errors.length }
  errors: ValidationError[] = []
}

export class ValidationFactory {
  private static _validationLookup: { [key: string]: (any) => IValidation } = {}

  static register (type: string, fromPlainObject: (any) => IValidation) {{
    ValidationFactory._validationLookup[type] = fromPlainObject
  }}

  static fromPlainObject (obj: any): IValidation {
    const fromPlainObject = ValidationFactory._validationLookup[obj.type]
    return fromPlainObject(obj)
  }
}


export class StringMinLengthValidation implements IValidation {
  
  static type = 'StringMinLengthValidation'
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
      result.errors.push(new ValidationError([this.name], StringMinLengthValidation.type, errorString))
    }

    return result
  }

  toPlainObject (): object {
    return {
      name: this.name,
      type: StringMinLengthValidation.type,
      length: this.length,
    }
  }

  static fromPlainObject (obj: any): StringMinLengthValidation {
    if (obj.type !== StringMinLengthValidation.type) {
      throw TypeError(`Cannot cast an object of type '${obj.type}' to StringMinLengthValidation`)
    }
    return new StringMinLengthValidation(obj.name, obj.length)
  }
}

ValidationFactory.register(StringMinLengthValidation.type, StringMinLengthValidation.fromPlainObject)


export class StringMaxLengthValidation implements IValidation {
  static type = 'StringMaxLengthValidation'
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
      result.errors.push(new ValidationError([this.name], StringMaxLengthValidation.type, errorString))
    }

    return result
  }

  toPlainObject () {
    return {
      name: this.name,
      type: StringMaxLengthValidation.type,
      length: this.length,
    }
  }

  static fromPlainObject (obj): StringMaxLengthValidation {
    if (obj.type !== StringMaxLengthValidation.type) {
      throw TypeError(`Cannot cast an object of type '${obj.type}' to StringMaxLengthValidation`)
    }
    return new StringMaxLengthValidation(obj.name, obj.length)
  }
}

ValidationFactory.register(StringMaxLengthValidation.type, StringMaxLengthValidation.fromPlainObject)


export class EmailValidation implements IValidation {
  static type = 'EmailValidation'
  name: string

  constructor (name: string) {
    this.name = name
  }

  validate (data) {
    const emailRegex = /^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
    const result = new ValidationResult()
    if (!emailRegex.test(data)) {
      const errorString = i18n.__('Not a valid email address')
      const error = new ValidationError([this.name], EmailValidation.type, errorString)
      result.errors.push(error)
    }
    return result
  }

  toPlainObject () {
    return {
      name: this.name,
      type: EmailValidation.type
    }
  }

  static fromPlainObject (obj): EmailValidation {
    if (obj.type !== EmailValidation.type) {
      throw TypeError(`Cannot cast an object of type '${obj.type}' to EmailValidation`)
    }
    return new EmailValidation(obj.name);
  }
}

ValidationFactory.register(EmailValidation.type, EmailValidation.fromPlainObject)
