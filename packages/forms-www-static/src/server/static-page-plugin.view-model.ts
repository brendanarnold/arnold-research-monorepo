import { Field, FieldSet, Form, FormData } from '@tngbl/forms'

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
      field.validations.map((v) => v.toPlainObject())
    )
    viewModel.data = data
    return viewModel
  }
}

export class FormViewModel {
  components: (SectionViewModel | FieldViewModel)[]
  data: FormData
  name: string

  static fromForm(form: Form): FormViewModel {
    const viewModel = new FormViewModel()
    viewModel.name = form.name
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
