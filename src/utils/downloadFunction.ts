export const downloadDocument = (content: string, filename: string) => {
  let element = document.createElement('a')
  element.setAttribute('href', content)
  element.setAttribute('target', '_blank')
  element.setAttribute('download', filename)

  document.body.appendChild(element)
  element.click()

  document.body.removeChild(element)
}
