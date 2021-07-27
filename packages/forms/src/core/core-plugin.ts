import { IFormsBuilderPlugin } from '../make-form-builder'
import { coreValidationBuilders } from './validations'
import { coreTriggerConditionBuilders } from './triggers'
import { coreViewBuilders } from './views'
import { version, name } from '../../package.json'

export const core: IFormsBuilderPlugin & {
  validations: IFormsBuilderPlugin
  dataTriggers: IFormsBuilderPlugin
  views: IFormsBuilderPlugin
} = {
  name: `${name}/core`,
  version,
  register(builder) {
    builder.builders.validationConditions.push(...coreValidationBuilders)
    builder.builders.triggerConditions.push(...coreTriggerConditionBuilders)
    builder.builders.views.push(...coreViewBuilders)
  },
  validations: {
    name: `${name}/core/validations`,
    version,
    register(builder) {
      builder.builders.validationConditions.push(...coreValidationBuilders)
    }
  },
  dataTriggers: {
    name: `${name}/core/dataTriggers`,
    version,
    register(builder) {
      builder.builders.triggerConditions.push(...coreTriggerConditionBuilders)
    }
  },
  views: {
    name: `${name}/core/views`,
    version,
    register(builder) {
      builder.builders.views.push(...coreViewBuilders)
    }
  }
}
