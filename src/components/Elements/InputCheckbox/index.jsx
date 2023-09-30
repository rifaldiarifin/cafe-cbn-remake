import { useEffect, useRef, useState } from 'react'

const InputCheckbox = ({ label = null, id, name, isChecked = false, value, callbackState = false, moreClass }) => {
  const [check, setCheck] = useState(isChecked)
  const ref = useRef(false)
  const switchCheck = async () => {
    if (callbackState) {
      return await callbackState(check, setCheck)
    }
    setCheck(check ? false : true)
  }
  useEffect(() => {
    if (!ref.current) {
      setCheck(isChecked)
      return () => (ref.current = false)
    }
    return () => (ref.current = true)
  }, [isChecked])
  return (
    <label
      htmlFor={id}
      className={`inputcheckbox${check === true ? ' active' : check === 2 ? ' both' : ''}${
        moreClass ? ' ' + moreClass : ''
      }`}
    >
      <input
        type="checkbox"
        name={name}
        id={id}
        defaultValue={value}
        checked={check}
        onChange={switchCheck}
        aria-label={label}
      />
      <span className="checkbox"></span>
      <span className="checkicon-1 icons8-filled done"></span>
      <span className="checkicon-2 icons8-filled subtract"></span>
    </label>
  )
}

export default InputCheckbox
