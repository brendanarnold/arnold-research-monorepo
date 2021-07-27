import { FormData } from './form'
import { IValidationCondition, IValidationError } from './@types'

export class Validator {
  constructor(
    public validationConditions: IValidationCondition[],
    public data: FormData = {},
    public dataId?: string
  ) {}

  validate(data?: FormData): IValidationError[] {
    if (typeof data === 'undefined' && typeof this.data === 'undefined') {
      throw new TypeError('No data supplied for validation')
    }
    return this.validationConditions
      .map((v) => v.validate(this.dataId, data))
      .flat()
  }
}
