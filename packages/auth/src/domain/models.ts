import { UUID } from '@tngbl/forms'

export interface IGroup {
  uuid: UUID
  name: string
}

export interface IPermission {
  allowed: IGroup[]
  denied: IGroup[]
}
