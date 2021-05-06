export class ErrorBlock {
  element: HTMLUListElement
  errors: string[] = []

  constructor(name: string) {
    this.element = document.getElementById(
      name + '__error-block'
    ) as HTMLUListElement
  }

  add(error: string): void {
    this.errors.push(error)
  }

  clear(): void {
    this.errors = []
  }

  render(): void {
    this.element.innerHTML = this.errors
      .map((error) => `<li>${error}</li>`)
      .join('\n')
  }
}
