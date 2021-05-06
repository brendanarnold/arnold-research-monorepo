import { IPageValidationHook } from '../browser'

const eventHook: IPageValidationHook = {
  componentName: 'first-name',
  registerHook: (dataId, validator, polyglot) => {
    const nameInput = document.getElementsByName(dataId)[0] as HTMLInputElement
    const errorCard = document.getElementById(
      `${dataId}__error-card`
    ) as HTMLElement

    const onInputChange = () => {
      const validationErrors = validator.validate(dataId, nameInput.value)

      if (validationErrors.length) {
        errorCard.innerHTML = 'Error' // @todo
        errorCard.classList.remove('hidden')
      } else {
        errorCard.innerHTML = ''
        errorCard.classList.add('hidden')
      }
    }

    nameInput?.addEventListener('input', onInputChange)
  }
}

export default eventHook
