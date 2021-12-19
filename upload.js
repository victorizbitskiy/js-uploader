export function upload(selector, options = {}) {
  const input = document.querySelector(selector)

  const open = document.createElement('button')
  open.classList.add('btn')
  open.textContent = 'Открыть'

  if (options.multi) {
    input.setAttribute('multiple', true)
  }

  if (options.accept && Array.isArray(options.accept)) {
    input.setAttribute('accept', options.accept.join(','))
  }

  input.insertAdjacentElement('afterend', open)



  const triggerInut = () => input.click()

  const changeHandler = event => {

  }

  open.addEventListener('click', triggerInut)
  input.addEventListener('change', changeHandler)
}