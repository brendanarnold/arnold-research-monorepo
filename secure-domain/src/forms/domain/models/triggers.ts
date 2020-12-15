
export interface IDataTrigger {
  isTriggered: (object) => boolean
  toPlainObject: () => object
}

export class DataTriggerFactor {
  static fromPlainObject (obj: any): IDataTrigger {
    // @todo
    return undefined
  }
}
