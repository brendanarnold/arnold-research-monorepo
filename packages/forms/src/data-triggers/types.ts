import { StoredPlainObject } from '@tngbl/models'

export interface IDataTrigger {
  isTriggered: (data: FormData) => boolean
  toPlainObject: () => StoredPlainObject
}

export interface IDataTriggerBuilder {
  name: string
  fromPlainObject: (
    obj: StoredPlainObject,
    dataTriggerBuilders?: Record<string, IDataTriggerBuilder>
  ) => IDataTrigger
}
