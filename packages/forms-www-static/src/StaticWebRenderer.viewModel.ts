import { Field, FieldSet, Form } from "@tngbl/forms"


class SectionViewModel {
  name: string
  viewType: string
  label: string
  components: (SubSectionViewModel | FieldViewModel)[]

  static fromFieldSet (fieldSet: FieldSet): SectionViewModel {
    const viewModel = new SectionViewModel()
    viewModel.viewType = 'Section'
    viewModel.name = fieldSet.name
    viewModel.label = fieldSet.label
    viewModel.components = fieldSet.structure.map(item => item instanceof Field
      ? FieldViewModel.fromField(item)
      : SubSectionViewModel.fromFieldSet(item))
    return viewModel
  }
}

class SubSectionViewModel {
  name: string
  viewType: string
  label: string
  components: FieldViewModel[]

  static fromFieldSet (fieldSet: FieldSet): SubSectionViewModel {
    const viewModel = new SubSectionViewModel()
    viewModel.viewType = 'SubSection'
    viewModel.name = fieldSet.name
    viewModel.label = fieldSet.label
    // @fixme Only go two levels deep in terms of sections, put in a check for this
    viewModel.components = fieldSet.structure.map(field => FieldViewModel.fromField(field as Field))
    return viewModel
  }
}

class FieldViewModel {
  name: string
  type: string
  viewType: string
  label: string

  static fromField (field: Field): FieldViewModel {
    const viewModel = new FieldViewModel()
    viewModel.name = field.name
    viewModel.viewType = field.viewType
    viewModel.label = field.label
    return viewModel
  }
}

export class FormViewModel {

  components: (SectionViewModel | FieldViewModel)[]
  
  static fromForm(form: Form): FormViewModel {
    const viewModel = new FormViewModel()
    viewModel.components = form.schema.structure.map(item => item instanceof FieldSet
      ? SectionViewModel.fromFieldSet(item as FieldSet)
      : FieldViewModel.fromField(item as Field))
    return viewModel
  }
}
