import { IFormsBuilderPlugin } from '../make-form-builder'
import { version, name } from '../../package.json'

export const gdpr: IFormsBuilderPlugin = {
  name: `${name}/gdpr`,
  version,
  register(builder) {
    // @todo
  }
}
