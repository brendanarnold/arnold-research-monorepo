import { IPageValidationHook } from '../../../../src/browser'

export const hook: IPageValidationHook = {
  componentName: 'favourite-colour',
  registerHook: (dataId, validator) => {
    const errorCard = document.getElementById(
      `${dataId}__error-card`
    ) as HTMLElement
    const inputField = document.getElementsByName(dataId)[0] as HTMLInputElement

    inputField.addEventListener('input', () => {
      const errors = validator.validate(dataId, inputField.value)
      if (errors.length) {
        errorCard.innerHTML = 'Error'
        errorCard.classList.remove('hidden')
      } else {
        errorCard.innerHTML = ''
        errorCard.classList.add('hidden')
      }
    })
  }
}
