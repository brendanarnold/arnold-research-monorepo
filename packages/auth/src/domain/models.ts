import { UUID } from '@tngbl/models'

export interface IGroup {
  uuid: UUID
  name: string
}

export interface IPermission {
  allowed: IGroup[]
  denied: IGroup[]
}
