import { UUID } from "../../shared/models";

export interface Group {
  uuid: UUID
  name: string
}

export interface Permission {
  allowed: Group[]
  denied: Group[]
}
