const Input = (props) => {
  const {
    type = 'text',
    name = 'myinput',
    id = undefined,
    placeHolder = '',
    ariaLabel = undefined,
    autoComplete = 'on',
    value = 'asdasd',
    onInput = () => {}
  } = props
  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeHolder}
      aria-label={ariaLabel ?? placeHolder}
      autoComplete={autoComplete}
      defaultValue={value}
      onInput={(e) => onInput(e)}
    />
  )
}

export default Input
