const SimpleComboLi = ({ value }) => {
  const switchSelection = (e) => {
    const simplePreview = e.target.parentElement.previousElementSibling
    simplePreview.parentElement.classList.remove('active')
    simplePreview.children[0].value = value
    return (simplePreview.dataset.selected = value)
  }
  const switchPoint = (e) => {
    const lipoint = e.target.parentElement.children[0]
    const transform = (point) => {
      return `transform: translateY(${point}px)`
    }
    lipoint.setAttribute('style', transform(e.target.offsetTop))
  }
  return (
    <li className="comboli" data-value={value} onClick={(e) => switchSelection(e)} onMouseEnter={(e) => switchPoint(e)}>
      {value}
    </li>
  )
}

export default SimpleComboLi
