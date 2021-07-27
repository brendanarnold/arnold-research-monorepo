import { ITriggerCondition } from './@types'
import { FormData } from './form'
import { TrueTriggerCondition } from './core/triggers/true'

export class Trigger {
  constructor(
    public dataId: string | undefined,
    public trigger: ITriggerCondition
  ) {}

  forData(data: FormData): boolean {
    return this.trigger.isTriggered(this.dataId || '', data)
  }

  static AlwaysTrue: Trigger = new Trigger(
    undefined,
    new TrueTriggerCondition()
  )
}
