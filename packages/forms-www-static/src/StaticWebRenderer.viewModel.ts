import { FieldSet, Form } from "@tngbl/forms"


class SectionViewModel {
  static fromFieldSet (fieldSet: FieldSet): SectionViewModel {
    const viewModel = new SectionViewModel()
    // @todo
    return viewModel
  }
}

class SubSectionViewModel {}

class FieldViewModel {}

export class FormViewModel {

  components: (SectionViewModel | FieldViewModel)[]
  
  static fromForm(form: Form): FormViewModel {
    const viewModel = new FormViewModel()
    
    return viewModel
  }
}
