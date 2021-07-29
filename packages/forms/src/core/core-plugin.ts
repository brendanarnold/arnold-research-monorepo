import { IFormsBuilderPlugin } from '../make-form-builder'
import { coreValidationBuilders } from './validations'
import { coreTriggerConditionBuilders } from './triggers'
import { coreViewBuilders } from './views'
import { version, name as pkgName } from '../../package.json'

export const core: IFormsBuilderPlugin & {
  validations: IFormsBuilderPlugin
  dataTriggers: IFormsBuilderPlugin
  views: IFormsBuilderPlugin
} = {
  name: `core`,
  version,
  fromPackage: pkgName,
  register(builder) {
    builder.withBuilders(
      [
        ...coreValidationBuilders,
        ...coreTriggerConditionBuilders,
        ...coreViewBuilders
      ],
      'core',
      pkgName,
      version
    )
  },
  validations: {
    name: `core.validations`,
    version,
    fromPackage: pkgName,
    register(builder) {
      builder.withBuilders(
        coreValidationBuilders,
        'core.validations',
        pkgName,
        version
      )
    }
  },
  dataTriggers: {
    name: `core.dataTriggers`,
    version,
    fromPackage: pkgName,
    register(builder) {
      builder.withBuilders(
        coreTriggerConditionBuilders,
        'core.dataTriggers',
        pkgName,
        version
      )
    }
  },
  views: {
    name: `core.views`,
    version,
    fromPackage: pkgName,
    register(builder) {
      builder.withBuilders(coreViewBuilders, 'core.views', pkgName, version)
    }
  }
}
