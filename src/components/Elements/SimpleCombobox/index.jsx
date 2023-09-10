const SimpleCombobox = (props) => {
  let stat = true
  const { children, select, styleBox, id, name = 'combo', fullRadius = undefined } = props

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
    <div className={`simple-combobox${styleBox ? ' ' + styleBox : ''}`}>
      <div
        className="smpl-preview"
        onClick={switchCombo}
        onMouseEnter={setHMenu}
        data-selected={select}
        style={{ borderRadius: fullRadius && '100px' }}
      >
        <input type="text" id={id} name={name} defaultValue={select} hidden />
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
