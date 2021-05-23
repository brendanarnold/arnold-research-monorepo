import { IFormsBuilderPlugin } from '../make-form-builder'
import { coreValidationBuilders } from './validations'
import { coreTriggerConditionBuilders } from './triggers'
import { coreViewBuilders } from './views'

export const core: IFormsBuilderPlugin = {
  register(builder) {
    builder.builders.validations.push(...coreValidationBuilders)
    builder.builders.triggerConditions.push(...coreTriggerConditionBuilders)
    builder.builders.views.push(...coreViewBuilders)
  },
  validations: {
    register(builder) {
      builder.builders.validations.push(...coreValidationBuilders)
    }
  } as IFormsBuilderPlugin,
  dataTriggers: {
    register(builder) {
      builder.builders.triggerConditions.push(...coreTriggerConditionBuilders)
    }
  } as IFormsBuilderPlugin,
  views: {
    register(builder) {
      builder.builders.views.push(...coreViewBuilders)
    }
  } as IFormsBuilderPlugin
}
