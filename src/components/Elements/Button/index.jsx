const Button = (props) => {
  const {
    children,
    type = "button",
    id = undefined,
    onClick = () => {},
    style,
    color,
    moreClass = undefined,
  } = props;
  return (
    <button
      type={type}
      className={`btn btn-${style} ${color} ${moreClass}`}
      id={id}
      onClick={(e) => onClick(e)}
    >
      <span>{children}</span>
    </button>
  );
};

export default Button;
