const SimpleCombobox = (props) => {
  let stat = true
  const { children, select } = props

  const switchCombo = (e) => {
    const simplePreview = e.target.parentElement
    if (simplePreview.classList.contains('active')) {
      return simplePreview.classList.remove('active')
    }
    return simplePreview.classList.add('active')
  }

  const setHMenu = (e) => {
    const simplePreview = e.target.parentElement
    if (stat)
      simplePreview.setAttribute(
        'style',
        `--h-menu: ${
          e.target.nextElementSibling.offsetHeight >= 200 ? 200 : e.target.nextElementSibling.offsetHeight
        }px`
      )
    stat = false
  }

  return (
    <div className="simple-combobox">
      <div
        className="smpl-preview"
        onClick={(e) => switchCombo(e)}
        onMouseEnter={(e) => setHMenu(e)}
        data-selected={select}
      >
        <span className="icons8-filled back"></span>
      </div>
      <ul className="smpl-menu">
        <li className="smpl-combopoint"></li>
        {children}
      </ul>
    </div>
  )
}

export default SimpleCombobox
