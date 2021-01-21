
import { DataField, DataSet } from '../../forms/build/domain/models/schema'
import {
  FormSchema
} from '../../forms/src/domain/models/schema'
import * as nunjucks from 'nunjucks'
import { DataTriggerFactor } from '../../forms/build/domain/models/triggers'

const templateLookup = {
  'form': 'form.njk',
  'form-section': 'form-section.njk',
  'form-sub-section': 'form-sub-section.njk',
  'firstName': 'first-name.njk',
  'lastName': 'last-name.njk'
}

type FieldValue = string | number

class FormFieldViewModel {
  name: string
  value: FieldValue

  static fromDataField(dataField: DataField): FormFieldViewModel {
    const viewModel = new FormFieldViewModel()
    
    return viewModel
  }
}

class FormSectionViewModel {
  name: string
  fields: FormFieldViewModel[]

  static fromDataSet(dataSet: DataSet): FormSectionViewModel {
    const viewModel = new FormSectionViewModel()
    viewModel.name = dataSet.name
    viewModel.fields = dataSet.schema.map(item => {
      if (item instanceof DataSet) {
        return FormSectionViewModel.fromDataSet(item)
      } else if (item instanceof DataField) {
        return FormFieldViewModel.
      }
    })
    return viewModel
  }
}

class FormViewModel {
  name: string
  sections: FormSectionViewModel[] = []

  static fromFormSchema (formSchema: FormSchema): FormViewModel {
    const viewModel = new FormViewModel()
    viewModel.name = formSchema.name
    viewModel.sections = formSchema.dataSets.map(d => FormSectionViewModel.fromDataSet())
    return new FormViewModel()
  }
}

class StaticWebRenderer {
  formSchema: FormSchema

  constructor (formSchema: FormSchema) {
    this.formSchema = formSchema
  }

  renderHtml (): string {

    nunjucks.configure('src/templates', {
      autoescape: true
    })

    const viewModel = FormViewModel.fromFormSchema(this.formSchema)

    const html = nunjucks.render('form.njk', viewModel)

    return html

  }

}
