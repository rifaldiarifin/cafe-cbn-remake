import Input from './InputField'

const SetMessage = (message, parentInput, required) => {
  if (typeof message !== 'string') throw new Error('message must be a string')
  if (message.length > 30) throw new Error('message length to long')
  // if (!required) return
  if (message.length === 0) {
    parentInput.classList.remove('invalid')
    parentInput.dataset.message = ``
    return
  }
  if (message.length > 0 && required) {
    parentInput.classList.add('invalid')
    parentInput.dataset.message = `${message}`
    return
  }
  parentInput.classList.remove('invalid')
}

const InputField = (props) => {
  const {
    label = undefined,
    addLabel = true,
    style = 'regular',
    type = 'text',
    name,
    id = undefined,
    placeHolder = '',
    autoComplete = 'on',
    moreClass = undefined,
    width = undefined,
    height = undefined,
    icon = undefined,
    iconSize = '22px',
    iconStyle = 'regular',
    value = '',
    onChange = () => {},
    required = false
  } = props
  const togglePassword = (e) => {
    const seePass = e.target
    const input = seePass.previousElementSibling
    if (input.type === 'password') {
      seePass.classList.replace('hide', 'eye')
      return (input.type = 'text')
    }
    seePass.classList.replace('eye', 'hide')
    input.type = 'password'
  }
  const triggerInput = {
    text: (e) => {
      const input = e.target

      // if input is empty
      if (input.value.length === 0) return SetMessage('Cannot be empty!', input.parentElement.parentElement, required)

      // if input has value
      if (input.value.length > 0) {
        SetMessage('', input.parentElement.parentElement, required)
      }
    },
    password: (e) => {
      const input = e.target

      // if input is empty
      if (input.value.length === 0) {
        input.nextElementSibling.classList.remove('active')
        return SetMessage('Cannot be empty!', input.parentElement.parentElement, required)
      }

      // if input has value
      if (input.value.length > 0) {
        SetMessage('', input.parentElement.parentElement, required)
        return input.nextElementSibling.classList.add('active')
      }
    },
    email: (e) => {
      const input = e.target
      const checkDoubleA = (emailString) => {
        const arr = emailString.split('')
        let count = 0
        arr.forEach((ar) => {
          if (ar === '@') count = count + 1
        })
        return count > 1
      }

      // if input is empty
      if (input.value.length === 0) return SetMessage('Cannot be empty!', input.parentElement.parentElement, required)

      // if value not contains symbol "@"
      if (!input.value.includes('@'))
        return SetMessage(`Invalid email! "@"`, input.parentElement.parentElement, required)

      // if value contains double or more symbol "@"
      if (checkDoubleA(input.value))
        return SetMessage(`Invalid email double! "@"`, input.parentElement.parentElement, required)

      // if input has value
      if (input.value.length > 0) {
        SetMessage('', input.parentElement.parentElement, required)
      }
    },
    phoneID: (e) => {
      const input = e.target

      const mobilePhoneID = {
        Telkomsel: ['0852', '0853', '0811', '0812', '0813', '0821', '0822', '0823', '0851'],
        IndosatOredoo: ['0857', '0856', '0814', '0815', '0816', '0855', '0858'],
        Tri: ['0896', '0895', '0897', '0898', '0899'],
        XL: ['0817', '0818', '0819', '0859', '0877', '0878'],
        AXIS: ['0831', '0832', '0833', '0838'],
        Smartfren: ['0881', '0882', '0883', '0884', '0885', '0886', '0887', '0888', '0889']
      }

      const all = [
        ...mobilePhoneID.Telkomsel,
        ...mobilePhoneID.IndosatOredoo,
        ...mobilePhoneID.Tri,
        ...mobilePhoneID.XL,
        ...mobilePhoneID.AXIS,
        ...mobilePhoneID.Smartfren
      ]

      const checkMobilePhoneID = (stringPhoneID) => {
        if (stringPhoneID.length < 4) return
        const arr = stringPhoneID.slice(0, 4)
        let count = 0
        all.forEach((ar) => {
          if (arr.toString() === ar) count = count + 1
        })
        return count > 0
      }

      // if input is empty
      if (input.value.length === 0) return SetMessage('Cannot be empty!', input.parentElement.parentElement, required)

      // mobile phon
      if (!checkMobilePhoneID(input.value))
        return SetMessage('Not a phone number ID!', input.parentElement.parentElement, required)

      // if input has value
      if (input.value.length > 0) {
        SetMessage('', input.parentElement.parentElement, required)
      }
    }
  }
  switch (type) {
    case 'text':
      return (
        <label
          htmlFor={id ?? name}
          className={`inputfield ${style}${addLabel ? ' label' : ''}${icon ? ' icon' : ''}${
            moreClass ? ' ' + moreClass : ''
          }`}
          data-label={label}
          data-message=""
          style={{ '--h-input': height, '--icon-ratio': iconSize, width: width }}
        >
          <div className="box w-100 dsp-flex align-itms-center">
            {icon ? (
              <span className={`icons8-${iconStyle} ${icon}`} style={iconSize && { '--i8-ratio': iconSize }}></span>
            ) : (
              ''
            )}
            <Input
              onChange={(e) => onChange(e)}
              value={value}
              type="text"
              name={name}
              id={id}
              placeHolder={placeHolder}
              ariaLabel={label}
              autoComplete={autoComplete}
              onInput={(e) => triggerInput.text(e)}
            ></Input>
          </div>
        </label>
      )
    case 'password':
      return (
        <label
          htmlFor={id ?? name}
          className={`inputfield ${style}${addLabel ? ' label' : ''}${moreClass ? ' ' + moreClass : ''}`}
          data-label={label}
          data-message=""
          style={{ '--h-input': height, '--icon-ratio': iconSize, width: width }}
        >
          <div className="box w-100 dsp-flex align-itms-center">
            {icon ? (
              <span className={`icons8-${iconStyle} ${icon}`} style={iconSize && { '--i8-ratio': iconSize }}></span>
            ) : (
              ''
            )}
            <Input
              onChange={(e) => onChange(e)}
              value={value}
              type="password"
              name={name}
              id={id}
              placeHolder={placeHolder}
              ariaLabel={label}
              autoComplete={autoComplete}
              onInput={(e) => triggerInput.password(e)}
            ></Input>
            <span className="see-pass icons8-regular hide" onClick={(e) => togglePassword(e)} />
          </div>
        </label>
      )
    case 'email':
      return (
        <label
          htmlFor={id ?? name}
          className={`inputfield ${style}${addLabel ? ' label' : ''}${moreClass ? ' ' + moreClass : ''}`}
          data-label={label}
          data-message=""
          style={{ '--h-input': height, '--icon-ratio': iconSize, width: width }}
        >
          <div className="box w-100 dsp-flex align-itms-center">
            {icon ? (
              <span className={`icons8-${iconStyle} ${icon}`} style={iconSize && { '--i8-ratio': iconSize }}></span>
            ) : (
              ''
            )}
            <Input
              onChange={(e) => onChange(e)}
              value={value}
              type="email"
              name={name}
              id={id}
              placeHolder={placeHolder}
              ariaLabel={label}
              autoComplete={autoComplete}
              onInput={(e) => triggerInput.email(e)}
            ></Input>
          </div>
        </label>
      )
    case 'phoneID':
      return (
        <label
          htmlFor={id ?? name}
          className={`inputfield ${style}${addLabel ? ' label' : ''}${moreClass ? ' ' + moreClass : ''}`}
          data-label={label}
          data-message=""
          style={{ '--h-input': height, '--icon-ratio': iconSize, width: width }}
        >
          <div className="box w-100 dsp-flex align-itms-center">
            {icon ? (
              <span className={`icons8-${iconStyle} ${icon}`} style={iconSize && { '--i8-ratio': iconSize }}></span>
            ) : (
              ''
            )}
            <Input
              onChange={(e) => onChange(e)}
              value={value}
              type="number"
              name={name}
              id={id}
              placeHolder={placeHolder}
              ariaLabel={label}
              autoComplete={autoComplete}
              onInput={(e) => triggerInput.phoneID(e)}
            ></Input>
          </div>
        </label>
      )
    case 'currencyIDR':
      return (
        <label
          htmlFor={id ?? name}
          className={`inputfield currency ${style}${addLabel ? ' label' : ''}${moreClass ? ' ' + moreClass : ''}`}
          data-label={label}
          data-message=""
          style={{ '--h-input': height, '--icon-ratio': iconSize, width: width }}
        >
          <div className="box w-100 dsp-flex align-itms-center">
            {icon ? (
              <span className={`icons8-${iconStyle} ${icon}`} style={iconSize && { '--i8-ratio': iconSize }}></span>
            ) : (
              ''
            )}
            <p className="curr">Rp </p>
            <Input
              onChange={(e) => onChange(e)}
              value={value}
              type="number"
              name={name}
              id={id}
              placeHolder={placeHolder}
              ariaLabel={label}
              autoComplete={autoComplete}
              onInput={(e) => triggerInput.phoneID(e)}
            ></Input>
          </div>
        </label>
      )

    case 'search':
      return (
        <label
          htmlFor={id ?? name}
          className={`inputfield ${style}${addLabel ? ' label' : ''}${icon ? ' icon' : ''}${
            moreClass ? ' ' + moreClass : ''
          }`}
          data-label={label}
          data-message=""
          style={{ '--h-input': height, '--icon-ratio': iconSize, width: width }}
        >
          <div className="box w-100 dsp-flex align-itms-center">
            {icon ? (
              <span className={`icons8-${iconStyle} ${icon}`} style={iconSize && { '--i8-ratio': iconSize }}></span>
            ) : (
              ''
            )}
            <Input
              onChange={(e) => onChange(e)}
              value={value}
              type="search"
              name={name}
              id={id}
              placeHolder={placeHolder}
              ariaLabel={label}
              autoComplete={autoComplete}
              onInput={(e) => triggerInput.text(e)}
            ></Input>
          </div>
        </label>
      )

    default:
      break
  }
}

InputField.SetMessage = SetMessage
export default InputField
