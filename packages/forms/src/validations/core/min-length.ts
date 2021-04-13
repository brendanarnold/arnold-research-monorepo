import { StoredPlainObject } from '@tngbl/models'
import { isNullOrUndefined, isNumber } from '@tngbl/utils'
import { IValidation, IValidationBuilder, IValidationError } from '../types'
import { FormData } from '../../domain/models/form'

interface IMeasurable {
  length: number
}

class MinLengthValidation implements IValidation {
  length: number

  constructor(length: number) {
    this.length = length
  }

  validate(id: string, data: FormData): IValidationError[] {
    if (!isNullOrUndefined(data) || !isNumber((data as IMeasurable).length)) {
      return []
    }
    if (data.length < this.length) {
      return [
        {
          dataId: id,
          validationName: builder.name,
          errorName: 'too-short'
        }
      ]
    } else {
      return []
    }
  }

  toPlainObject(): StoredPlainObject {
    return {
      type: builder.name,
      length: this.length
    }
  }
}

export const builder: IValidationBuilder = {
  name: 'MinLengthValidation',
  fromPlainObject(obj: StoredPlainObject): IValidation {
    const validation = new MinLengthValidation(obj.length)
    return validation
  }
}
