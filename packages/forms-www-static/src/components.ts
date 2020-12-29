
import {
  FormSchema
} from '../../forms/src/domain/models/schema'

class StaticWebRenderer {
  formSchema: FormSchema
  htmlContainerId: string

  constructor (formSchema: FormSchema, htmlContainerId: string) {
    this.formSchema = formSchema
    this.htmlContainerId = htmlContainerId
  }

  renderHtml () {
    
  }

}
