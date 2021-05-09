import { IFormsBuilderPlugin } from '../make-form-builder'
import { coreValidationBuilders } from './validations'
import { coreViewBuilders } from './views'

// @todo
const coreDataTriggerBuilders = []

export const core: IFormsBuilderPlugin = {
  register(builder) {
    builder.builders.validations.push(...coreValidationBuilders)
    builder.builders.dataTriggers.push(...coreDataTriggerBuilders)
    builder.builders.views.push(...coreViewBuilders)
  },
  validations: {
    register(builder) {
      builder.builders.validations.push(...coreValidationBuilders)
    }
  } as IFormsBuilderPlugin,
  dataTriggers: {
    register(builder) {
      builder.builders.dataTriggers.push(...coreDataTriggerBuilders)
    }
  } as IFormsBuilderPlugin,
  views: {
    register(builder) {
      builder.builders.views.push(...coreViewBuilders)
    }
  } as IFormsBuilderPlugin
}
