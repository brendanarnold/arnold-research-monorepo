import { IFormsBuilderPlugin } from '../make-form-builder'
import { coreValidationBuilders } from './validations'

// @todo
const coreDataTriggerBuilders = []

export const core: IFormsBuilderPlugin = {
  register(builder) {
    builder.builders.validations.push(...coreValidationBuilders)
    builder.builders.dataTriggers.push(...coreDataTriggerBuilders)
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
  } as IFormsBuilderPlugin
}
