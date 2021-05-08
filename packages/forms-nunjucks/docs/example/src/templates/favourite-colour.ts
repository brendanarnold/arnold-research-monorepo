import { IPageValidationHook, ErrorBlock } from '../../../../src/browser'

export const hook: IPageValidationHook = {
  componentName: 'favourite-colour',
  register: (args) => {
    const inputField = document.getElementsByName(
      args.dataId
    )[0] as HTMLInputElement

    inputField.addEventListener('input', () => {
      const errorBlock = new ErrorBlock(args.dataId)
      args.form
        .validatorFor(args.dataId)
        ?.validate(args.dataId, inputField.value)
        .forEach((e) => errorBlock.add(e.text))
      errorBlock.render()
    })
  }
}
