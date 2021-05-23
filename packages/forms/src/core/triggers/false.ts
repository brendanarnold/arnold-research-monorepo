import {
  ITriggerCondition,
  ITriggerConditionBuilder,
  StoredPlainObject
} from '../../types'

export class FalseTriggerCondition implements ITriggerCondition {
  isTriggered(): boolean {
    return false
  }

  toJson(): StoredPlainObject {
    return { type: FalseTriggerCondition.name }
  }
}

export const builder: ITriggerConditionBuilder = {
  type: FalseTriggerCondition.name,
  fromJson(): FalseTriggerCondition {
    return new FalseTriggerCondition()
  }
}
