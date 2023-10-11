const Input = ({
  type = 'text',
  name = 'myinput',
  id = undefined,
  placeHolder = '',
  ariaLabel = undefined,
  autoComplete = 'on',
  value = 'asdasd',
  autoFocus = false,
  onInput = () => {}
}) => {
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
      autoFocus={autoFocus}
    />
  )
}

export default Input
