const Input = (props) => {
  const {
    type = "text",
    name,
    id = undefined,
    placeHolder = "",
    ariaLabel = undefined,
    autoComplete = "on",
    onInput = () => {},
  } = props;
  return (
    <input
      type={type}
      name={name}
      id={id ?? name}
      placeholder={placeHolder}
      aria-label={ariaLabel ?? placeHolder}
      autoComplete={autoComplete}
      onInput={(e) => onInput(e)}
    />
  );
};

export default Input;
