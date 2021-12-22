function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (!bytes) {
    return '0 Byte'
  }
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i]
}

export function upload(selector, options = {}) {
  const input = document.querySelector(selector)
  const preview = document.createElement('div')

  preview.classList.add('preview')

  const open = document.createElement('button')
  open.classList.add('btn')
  open.textContent = 'Открыть'

  if (options.multi) {
    input.setAttribute('multiple', true)
  }

  if (options.accept && Array.isArray(options.accept)) {
    input.setAttribute('accept', options.accept.join(','))
  }

  input.insertAdjacentElement('afterend', preview)
  input.insertAdjacentElement('afterend', open)

  const triggerInut = () => input.click()
  const changeHandler = event => {

    if (!event.target.files.length) {
      return
    }

    const files = Array.from(event.target.files)

    preview.innerHTML = ''

    files.forEach(file => {
      if (!file.type.match('image')) {
        return
      }

      const reader = new FileReader()

      reader.onload = ev => {
        const src = ev.target.result
        preview.insertAdjacentHTML('afterbegin', `
        <div class="preview-image">
        <div class="preview-remove">&times</div>
          <img src="${ev.target.result}" alt="${file.name}"/>
          <div class="preview-info">
            <span>${file.name}</span>
            ${bytesToSize(file.size)}
          </div>
        </div>
        `)
      }

      reader.readAsDataURL(file)

    })
  }

  open.addEventListener('click', triggerInut)
  input.addEventListener('change', changeHandler)
}