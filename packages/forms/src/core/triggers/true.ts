import {
  ITriggerCondition,
  ITriggerConditionBuilder,
  StoredPlainObject
} from '../../types'

export class TrueTriggerCondition implements ITriggerCondition {
  isTriggered(): boolean {
    return true
  }

  toJson(): StoredPlainObject {
    return { type: TrueTriggerCondition.name }
  }
}

export const builder: ITriggerConditionBuilder = {
  type: TrueTriggerCondition.name,
  fromJson(): TrueTriggerCondition {
    return new TrueTriggerCondition()
  }
}
