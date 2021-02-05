import { StoredPlainObject } from "@tngbl/models";

export interface IDataTrigger {
  isTriggered: (object) => boolean
  toPlainObject: () => StoredPlainObject
}

export class DataTriggerFactory {
  private static _dataTriggerLookup: { [key: string]: (any) => IDataTrigger } = {}

  static register (type: string, fromPlainObject: (any) => IDataTrigger) {{
    DataTriggerFactory._dataTriggerLookup[type] = fromPlainObject
  }}

  static fromPlainObject (obj: any): IDataTrigger {
    const fromPlainObject = DataTriggerFactory._dataTriggerLookup[obj.type]
    return fromPlainObject(obj)
  }
}

