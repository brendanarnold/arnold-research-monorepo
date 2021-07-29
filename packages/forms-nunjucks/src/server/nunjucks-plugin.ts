import * as path from 'path'
import * as nunjucks from 'nunjucks'
import {
  Form,
  Field,
  FieldSet,
  FormData,
  IFormsBuilderPlugin
} from '@tngbl/forms'
import { name, version } from '../../package.json'

declare module '@tngbl/forms' {
  interface Form {
    /**
     * Renders the form as HTML using the given Nunjucks templates
     *
     * Added by the @tngbl/forms-nunjucks plugin
     */
    toHtml(): string
  }
}

export interface NunjucksPluginOptions {
  templateDirs: string[]
}

export const nunjucksRenderer = (
  opts: NunjucksPluginOptions
): IFormsBuilderPlugin => {
  return {
    name: `nunjucks`,
    version,
    fromPackage: 'name',
    register() {
      const templateDirs = [
        path.join(__dirname, '..', 'templates'),
        ...(opts.templateDirs || [])
      ]

      Form.prototype.toHtml = function () {
        nunjucks.configure(templateDirs, {
          autoescape: true
        })

        const viewModel = {
          form: FormViewModel.fromForm(this)
        }

        const html = nunjucks.render('form.njk', viewModel)

        return html
      }
    }
  }
}

class SectionViewModel {
  name: string
  viewType: string
  label: string
  components: (SubSectionViewModel | FieldViewModel)[]
  data: FormData

  static fromFieldSet(fieldSet: FieldSet, data: FormData): SectionViewModel {
    const viewModel = new SectionViewModel()
    viewModel.viewType = 'Section'
    viewModel.name = fieldSet.name
    viewModel.label = fieldSet.label
    viewModel.components = fieldSet.structure.map((item) =>
      item instanceof Field
        ? FieldViewModel.fromField(item, data[item.name])
        : SubSectionViewModel.fromFieldSet(item, data[item.name] as FormData)
    )
    viewModel.data = data
    return viewModel
  }
}

class SubSectionViewModel {
  name: string
  viewType: string
  label: string
  components: FieldViewModel[]
  data: FormData

  static fromFieldSet(fieldSet: FieldSet, data: FormData): SubSectionViewModel {
    const viewModel = new SubSectionViewModel()
    viewModel.viewType = 'SubSection'
    viewModel.name = fieldSet.name
    viewModel.label = fieldSet.label
    // @fixme Only go two levels deep in terms of sections, put in a check for this
    viewModel.components = fieldSet.structure.map((field) =>
      FieldViewModel.fromField(field as Field, data[field.name] as FormData)
    )
    viewModel.data = data
    return viewModel
  }
}

class FieldViewModel {
  name: string
  type: string
  viewType: string
  label: string
  data: FormData
  validationJson: string
  form: Form

  static fromField(field: Field, data: FormData): FieldViewModel {
    const viewModel = new FieldViewModel()
    viewModel.name = field.name
    viewModel.viewType = field.viewType
    viewModel.label = field.label
    viewModel.validationJson = JSON.stringify(
      field.validationConditions.map((v) => v.toJson())
    )
    viewModel.data = data
    return viewModel
  }
}

class FormViewModel {
  name: string
  data: FormData
  components: (SectionViewModel | FieldViewModel)[]
  formJson: string

  static fromForm(form: Form): FormViewModel {
    const viewModel = new FormViewModel()
    viewModel.name = form.name
    viewModel.formJson = JSON.stringify(form.toJson())
    viewModel.components = form.schema.structure.map((item) =>
      item instanceof FieldSet
        ? SectionViewModel.fromFieldSet(
            item as FieldSet,
            form.data[item.name] as FormData
          )
        : FieldViewModel.fromField(
            item as Field,
            form.data[item.name] as FormData
          )
    )
    viewModel.data = form.data
    return viewModel
  }
}
