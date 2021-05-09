import { isNullOrUndefined, isNumber } from '../../utils/types'
import {
  IValidation,
  IValidationBuilder,
  IValidationError,
  StoredPlainObject
} from '../../types'
import { FormData } from '../../form'

interface IMeasurable {
  length: number
}

export class MinLengthValidation implements IValidation {
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
          validation: builder.name,
          error: 'too-short',
          translateKey: `validations.${builder.name}.too-short`,
          translateVars: { length: this.length }
        }
      ]
    } else {
      return []
    }
  }

  toJson(): StoredPlainObject {
    return {
      type: builder.name,
      length: this.length
    }
  }
}

export const builder: IValidationBuilder = {
  name: 'MinLengthValidation',
  fromJson(obj: StoredPlainObject): IValidation {
    const validation = new MinLengthValidation(obj.length)
    return validation
  }
}
