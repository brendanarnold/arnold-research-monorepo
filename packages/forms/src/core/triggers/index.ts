import { TrueTriggerCondition, builder as trueBuilder } from './true'
import { FalseTriggerCondition, builder as falseBuilder } from './false'
import { EqualsTriggerCondition, builder as equalsBuilder } from './equals'

export {
  TrueTriggerCondition as True,
  FalseTriggerCondition as False,
  EqualsTriggerCondition as Equals
}
export const coreTriggerConditionBuilders = [
  trueBuilder,
  falseBuilder,
  equalsBuilder
]
