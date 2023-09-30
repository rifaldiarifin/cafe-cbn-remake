import { useEffect, useRef } from 'react'

const SimpleCombobox = ({ children, select, styleBox, id, name = 'combo', fullRadius = undefined }) => {
  let stat = true
  const simpleCombobox = useRef(null)

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

  const useOutsideClick = (combobox) => {
    useEffect(() => {
      const handleOutsideClick = (e) => {
        if (combobox.current && !combobox.current.contains(e.target)) {
          combobox.current.classList.remove('active')
        }
      }
      document.addEventListener('click', handleOutsideClick)
      return () => document.removeEventListener('click', handleOutsideClick)
    }, [combobox])
  }

  useOutsideClick(simpleCombobox)

  return (
    <div className={`simple-combobox${styleBox ? ' ' + styleBox : ''}`} ref={simpleCombobox}>
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
