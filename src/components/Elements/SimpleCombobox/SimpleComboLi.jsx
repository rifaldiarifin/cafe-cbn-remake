const SimpleComboLi = (props) => {
  const { children } = props
  const switchSelection = (e) => {
    const simplePreview = e.target.parentElement.previousElementSibling
    simplePreview.parentElement.classList.remove('active')
    return (simplePreview.dataset.selected = children)
  }
  const switchPoint = (e) => {
    const lipoint = e.target.parentElement.children[0]
    const transform = (point) => {
      return `transform: translateY(${point}px)`
    }
    lipoint.setAttribute('style', transform(e.target.offsetTop))
  }
  return (
    <li className="comboli" onClick={(e) => switchSelection(e)} onMouseEnter={(e) => switchPoint(e)}>
      {children}
    </li>
  )
}

export default SimpleComboLi
