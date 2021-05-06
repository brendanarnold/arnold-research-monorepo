import { IPageValidationHook, ErrorBlock } from '../browser'

const eventHook: IPageValidationHook = {
  componentName: 'new-password',
  registerHook: ({ dataId, polyglot, validator }) => {
    const inputElements = document.querySelectorAll('input')

    let confirmTouched = false

    const onInputChange = () => {
      const errorBlock = new ErrorBlock(dataId)
      if (confirmTouched && inputElements[0].value !== inputElements[1].value) {
        const error = polyglot.t(
          'validations.new-password.confirm-does-not-match'
        )
        errorBlock.add(error)
      }

      validator
        .validate(dataId, inputElements[0].value)
        .map((error) => error.translationKey)
        .forEach((key) => errorBlock.add(key))

      errorBlock.render()
    }

    const onFocus = () => {
      confirmTouched = true
    }

    inputElements.forEach((element) => {
      element.addEventListener('focus', onFocus)
      element.addEventListener('input', onInputChange)
    })
  }
}

export default eventHook
