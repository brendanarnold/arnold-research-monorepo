import { IFormsBuilderPlugin } from '../make-form-builder'
import { version, name } from '../../package.json'

export const gdpr: IFormsBuilderPlugin = {
  name: `gdpr`,
  fromPackage: name,
  version,
  register(builder) {
    // @todo
  }
}
