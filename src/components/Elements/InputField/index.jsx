import Input from './InputField'

const InputField = (props) => {
  const {
    label = undefined,
    style = 'regular',
    type = 'text',
    name,
    id = undefined,
    placeHolder = '',
    autoComplete = 'on',
    moreClass = undefined,
    required = 'off'
  } = props
  const setMessage = (message, parentInput) => {
    if (typeof message !== 'string') throw new Error('message must be a string')
    if (message.length > 30) throw new Error('message length to long')
    if (message.length === 0 && required === 'off') {
      parentInput.classList.remove('invalid')
      parentInput.dataset.message = ``
      return
    }
    if (message.length > 0) {
      parentInput.classList.add('invalid')
      parentInput.dataset.message = `${message}`
      return
    }
    parentInput.classList.remove('invalid')
  }
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
      if (input.value.length === 0) return setMessage('Cannot be empty!', input.parentElement)

      // if input has value
      if (input.value.length > 0) {
        setMessage('', input.parentElement)
      }
    },
    password: (e) => {
      const input = e.target

      // if input is empty
      if (input.value.length === 0) {
        input.nextElementSibling.classList.remove('active')
        return setMessage('Cannot be empty!', input.parentElement)
      }

      // if input has value
      if (input.value.length > 0) {
        setMessage('', input.parentElement)
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
      if (input.value.length === 0) return setMessage('Cannot be empty!', input.parentElement)

      // if value not contains symbol "@"
      if (!input.value.includes('@')) return setMessage(`Invalid email! "@"`, input.parentElement)

      // if value contains double or more symbol "@"
      if (checkDoubleA(input.value)) return setMessage(`Invalid email double! "@"`, input.parentElement)

      // if input has value
      if (input.value.length > 0) {
        setMessage('', input.parentElement)
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
      if (input.value.length === 0) return setMessage('Cannot be empty!', input.parentElement)

      // mobile phon
      if (!checkMobilePhoneID(input.value)) return setMessage('Not a phone number ID!', input.parentElement)

      // if input has value
      if (input.value.length > 0) {
        setMessage('', input.parentElement)
      }
    }
  }
  switch (type) {
    case 'text':
      console.log('Text')
      return (
        <label
          htmlFor={id ?? name}
          className={`inputfield ${style}${moreClass ? ' ' + moreClass : ''}`}
          data-label={label}
          data-message=""
        >
          <Input
            type="text"
            name={name}
            id={id}
            placeHolder={placeHolder}
            ariaLabel={label}
            autoComplete={autoComplete}
            onInput={(e) => triggerInput.text(e)}
          ></Input>
        </label>
      )
    case 'password':
      console.log('Password')
      return (
        <label
          htmlFor={id ?? name}
          className={`inputfield ${style}${moreClass ? ' ' + moreClass : ''}`}
          data-label={label}
          data-message=""
        >
          <Input
            type="password"
            name={name}
            id={id}
            placeHolder={placeHolder}
            ariaLabel={label}
            autoComplete={autoComplete}
            onInput={(e) => triggerInput.password(e)}
          ></Input>
          <span className="see-pass icons8-regular hide" onClick={(e) => togglePassword(e)} />
        </label>
      )
    case 'email':
      console.log('Email')
      return (
        <label
          htmlFor={id ?? name}
          className={`inputfield ${style}${moreClass ? ' ' + moreClass : ''}`}
          data-label={label}
          data-message=""
        >
          <Input
            type="email"
            name={name}
            id={id}
            placeHolder={placeHolder}
            ariaLabel={label}
            autoComplete={autoComplete}
            onInput={(e) => triggerInput.email(e)}
          ></Input>
        </label>
      )
    case 'phoneID':
      console.log('PhoneID')
      return (
        <label
          htmlFor={id ?? name}
          className={`inputfield ${style}${moreClass ? ' ' + moreClass : ''}`}
          data-label={label}
          data-message=""
        >
          <Input
            type="number"
            name={name}
            id={id}
            placeHolder={placeHolder}
            ariaLabel={label}
            autoComplete={autoComplete}
            onInput={(e) => triggerInput.phoneID(e)}
          ></Input>
        </label>
      )

    default:
      break
  }
}

export default InputField
