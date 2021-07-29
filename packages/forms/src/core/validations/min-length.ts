import { isNullOrUndefined, isNumber } from '../../utils/types'
import {
  IValidationCondition,
  IValidationConditionBuilder,
  IValidationError,
  StoredPlainObject
} from '../../@types'
import { FormData } from '../../form'

interface IMeasurable {
  length: number
}

export class MinLengthValidation implements IValidationCondition {
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
          validation: MinLengthValidation.name,
          error: 'too-short',
          translateKey: `validations.${MinLengthValidation.name}.too-short`,
          translateVars: { length: this.length }
        }
      ]
    } else {
      return []
    }
  }

  toJson(): StoredPlainObject {
    return {
      type: MinLengthValidation.name,
      length: this.length
    }
  }
}

export const builder: IValidationConditionBuilder = {
  type: MinLengthValidation.name,
  fromJson(obj: StoredPlainObject): IValidationCondition {
    const validation = new MinLengthValidation(obj.length)
    return validation
  }
}
