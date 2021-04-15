import { IValidationError } from '@tngbl/forms'
import { IPageValidationHook } from '../browser'

const eventHook: IPageValidationHook = {
  componentName: 'new-password',
  registerHook: (dataId, validator, polyglot) => {
    const passwordInput = document.getElementsByName(
      dataId
    )[0] as HTMLInputElement
    const passwordConfirmInput = document.getElementsByName(
      `${dataId}Confirm`
    )[0] as HTMLInputElement
    const errorCard = document.getElementById(
      `${dataId}__error-card`
    ) as HTMLElement

    let confirmTouched = false

    const onInputChange = () => {
      const validationErrors = validator.validate(dataId, passwordInput.value)
      let matchError: IValidationError | undefined

      if (
        confirmTouched &&
        passwordConfirmInput.value !== passwordInput.value
      ) {
        matchError = {
          dataId: dataId,
          validationName: 'new-password',
          errorName: 'confirm-does-not-match'
        }
      }

      if (validationErrors.length || matchError) {
        errorCard.innerHTML = 'Error'
        errorCard.classList.remove('hidden')
      } else {
        errorCard.innerHTML = ''
        errorCard.classList.add('hidden')
      }
    }

    const onFocus = () => {
      confirmTouched = true
    }

    passwordInput?.addEventListener('focus', onFocus)
    passwordConfirmInput?.addEventListener('focus', onFocus)
    passwordInput?.addEventListener('input', onInputChange)
    passwordConfirmInput?.addEventListener('input', onInputChange)
  }
}

export default eventHook
