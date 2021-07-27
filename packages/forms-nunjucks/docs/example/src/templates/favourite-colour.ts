import { IPageValidationHook, ErrorBlock } from '../../../../src/browser'

export const hook: IPageValidationHook = {
  componentName: 'favourite-colour',
  register: ({ dataId, form }) => {
    const inputField = document.getElementsByName(dataId)[0] as HTMLInputElement

    inputField.addEventListener('input', () => {
      const errorBlock = new ErrorBlock(dataId)
      form
        .validatorFor(dataId)
        ?.validate(inputField.value)
        .forEach((e) => errorBlock.add(form.view.translate(e)))
      errorBlock.render()
    })
  }
}
