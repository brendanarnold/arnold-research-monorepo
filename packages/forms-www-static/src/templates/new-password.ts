import { IPageValidationHook, ErrorBlock } from '../browser'

const eventHook: IPageValidationHook = {
  componentName: 'new-password',
  register: ({ dataId, form }) => {
    const inputElements = document.querySelectorAll('input')

    let confirmTouched = false

    const onInputChange = () => {
      const errorBlock = new ErrorBlock(dataId)

      if (confirmTouched) {
        form
          .validatorFor(dataId)
          ?.validate(dataId, inputElements[0].value)
          .forEach((error) => errorBlock.add(error.text))

        // Check if matching
        if (inputElements[0].value !== inputElements[1].value) {
          errorBlock.add('Passwords do not match')
          // errorKeys.push('validations.new-password.confirm-does-not-match')
        }
      }
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
