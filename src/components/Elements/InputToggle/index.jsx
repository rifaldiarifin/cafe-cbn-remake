import { useRef, useState } from 'react'

const InputToggle = ({ label = null, name, id, initialToggle = false, moreClass, callback = async () => {} }) => {
  const [toggle, setToggle] = useState(initialToggle)
  const ref = useRef(true)
  const toggleInput = async () => {
    if (ref.current) {
      setToggle(toggle ? false : true)
      await callback(toggle ? false : true)
      ref.current = false
      setTimeout(() => {
        ref.current = true
      }, 1200)
    }
  }
  return (
    <div className={`inputtoggle${moreClass ? ' ' + moreClass : ''}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <div className={`toggle-track${toggle ? ' active' : ''}`} onClick={toggleInput}>
        <div className="in-track">
          <span className="toggle-thumb" />
        </div>
      </div>
      <input type="checkbox" name={name} id={id} defaultChecked={toggle} />
    </div>
  )
}

export default InputToggle
