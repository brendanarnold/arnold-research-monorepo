
import { GdprPolicy, Storable } from '../entities/secure-data'
import * as dataAccess from '../data-access'
import { AuditToken, Monitor } from '../../../monitor'
import { Tag } from '../../monitor-tags'


export const saveToSecureStoreAction = async (object: Storable, auditToken: AuditToken, gdprPolicy: GdprPolicy) => {
  const monitor = new Monitor()

  const secureData = await dataAccess.secureData.create(object, gdprPolicy)
  
  monitor.audit({
    message: 'Saved object to secure data',
    auditToken,
    tags: [Tag.SecureStoreSavedObject],
    data: {
      secureDataIds: [secureData.id]
    }
  })

  return secureData
}


export const getFromSecureStoreAction = async (objectIds: string[], auditToken: AuditToken) => {
  const monitor = new Monitor()

  const secureData = await dataAccess.secureData.byIds(objectIds)

  monitor.audit({
    message: 'Retrieved secure data from storage',
    auditToken,
    tags: [Tag.SecureStoreAccessedObject],
    data: {
      secureDataIds: secureData.map(sd => sd.id)
    }
  })

  return secureData
}
