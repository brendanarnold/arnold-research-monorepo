import { StoredPlainObject } from ".";

export interface IDataTrigger {
  isTriggered: (object) => boolean
  toPlainObject: () => StoredPlainObject
}

export class DataTriggerFactor {
  private static _dataTriggerLookup: { [key: string]: (any) => IDataTrigger } = {}

  static register (type: string, fromPlainObject: (any) => IDataTrigger) {{
    DataTriggerFactor._dataTriggerLookup[type] = fromPlainObject
  }}

  static fromPlainObject (obj: any): IDataTrigger {
    const fromPlainObject = DataTriggerFactor._dataTriggerLookup[obj.type]
    return fromPlainObject(obj)
  }
}

