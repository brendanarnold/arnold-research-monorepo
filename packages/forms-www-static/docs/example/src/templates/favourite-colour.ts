import { IPageValidationHook } from '../../../../src/browser'

export const hook: IPageValidationHook = {
  componentName: 'favourite-colour',
  registerHook: (args) => {
    const errorCard = document.getElementById(
      `${args.dataId}__error-card`
    ) as HTMLElement
    const inputField = document.getElementsByName(
      args.dataId
    )[0] as HTMLInputElement

    inputField.addEventListener('input', () => {
      const errors = args.validator.validate(args.dataId, inputField.value)
      if (errors.length) {
        errorCard.innerHTML =
          '<ul>' +
          errors.map(
            (e) =>
              '<li>' +
              args.polyglot.t(
                `@tngbl/forms-www-static.templates.${e.validationName}.${e.errorName}`
              ) +
              '</li>'
          ) +
          '</ul>'
        errorCard.classList.remove('hidden')
      } else {
        errorCard.innerHTML = ''
        errorCard.classList.add('hidden')
      }
    })
  }
}
