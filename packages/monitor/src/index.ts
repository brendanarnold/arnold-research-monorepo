export class AuditToken {
  correlationIds: string[]
  userId: string[]
}

export interface AuditParams {
  auditToken: AuditToken
  message?: string
  error?: Error
  tags?: string[]
  data?: Record<string, unknown>
}

export interface TraceParams {
  message?: string
  error?: Error
  correlationIds?: string[]
  tags?: string[]
  data?: Record<string, unknown>
}

export interface MetricParams {
  message?: string
  value?: number | string
  correlationIds?: string[]
  tags?: string[]
  data?: Record<string, unknown>
}

export class Monitor {
  tags: string[] = []

  withTags = (tags: string[]): Monitor => {
    this.tags.push(...tags)
    return this
  }

  audit = ({ message, error }: AuditParams): void => {
    if (error) {
      console.error(error)
    } else {
      console.log(message)
    }
  }

  trace = ({ message, error }: TraceParams): void => {
    if (error) {
      console.error(error)
    } else {
      console.log(message)
    }
  }

  metric = ({ message, value }: MetricParams): void => {
    console.log(`${message} [${value}]`)
  }
}
