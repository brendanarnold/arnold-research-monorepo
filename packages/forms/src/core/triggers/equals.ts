import {
  ITriggerCondition,
  ITriggerConditionBuilder,
  StoredPlainObject
} from '../../types'
import { FormData } from '../../form'
import { findInData } from '../../utils/find'
import { hasProperty } from '../../utils'
import { False } from '.'

interface IFormDataReference {
  dataId: string | undefined
}

type Match = number | string | undefined | null | IFormDataReference
False
export class EqualsTriggerCondition implements ITriggerCondition {
  static Self = { dataId: undefined }

  constructor(
    public left: Match,
    public right: Match = EqualsTriggerCondition.Self
  ) {}

  isTriggered(dataId: string, data: FormData): boolean {
    const left = hasProperty(this.left, 'dataId')
      ? findInData(
          data,
          this.left === EqualsTriggerCondition.Self
            ? dataId
            : (this.left as IFormDataReference).dataId || ''
        )
      : this.left
    const right = hasProperty(this.right, 'dataId')
      ? findInData(
          data,
          this.right === EqualsTriggerCondition.Self
            ? dataId
            : (this.right as IFormDataReference).dataId || ''
        )
      : this.right
    return left === right
  }

  toJson(): StoredPlainObject {
    return {
      type: EqualsTriggerCondition.name,
      left: this.left,
      right: this.right
    }
  }
}

export const builder: ITriggerConditionBuilder = {
  type: EqualsTriggerCondition.name,
  fromJson(json, builders): EqualsTriggerCondition {
    const trigger = new EqualsTriggerCondition(json.left, json.right)
    return trigger
  }
}
