
export interface AuditParams {
  message?: string,
  error?: Error
}

export interface TraceParams {
  message?: string,
  error?: Error
}

export interface MetricParams {
  message?: string,
  value?: Number | String
}


export class Monitor {
  
  audit = ({ message, error }: AuditParams) : void => {
    if (error) {
      console.error(error)
    } else {
      console.log(message)
    }
  }
  
  trace = ({ message, error }: TraceParams) => {
    if (error) {
      console.error(error)
    } else {
      console.log(message)
    }
  }
  
  metric = ({ message, value }: MetricParams) => {
    console.log(`${message} [${value}]`)
  }
}




