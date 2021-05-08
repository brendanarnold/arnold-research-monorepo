import { IPageValidationHook } from '../browser'

const eventHook: IPageValidationHook = {
  componentName: 'first-name',
  register: ({ dataId, form }) => {
    const nameInput = document.getElementsByName(dataId)[0] as HTMLInputElement
    const errorCard = document.getElementById(
      `${dataId}__error-card`
    ) as HTMLElement

    const onInputChange = () => {
      const errors = form.validatorFor(dataId).validate(dataId, nameInput.value)

      if (errors.length) {
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
