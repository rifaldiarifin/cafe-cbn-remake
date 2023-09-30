import { Link } from 'react-router-dom'

const Button = ({
  children,
  type = 'button',
  to = '/',
  id = undefined,
  onClick = () => {},
  style = undefined,
  color = 'default',
  disabled = false,
  icon = undefined,
  iconStyle = 'regular',
  iconSize = undefined,
  iconColor = undefined,
  brightness = undefined,
  width = undefined,
  height = undefined,
  moreClass = undefined
}) => {
  switch (type) {
    case 'hyperlink':
      return (
        <Link
          to={to}
          className={`btn ${style ? 'btn-' + style : ''} ${color}${moreClass ? ` ${moreClass}` : ''}${
            disabled ? ' disabled' : ''
          }`}
          id={id}
          onClick={(e) => onClick(e)}
          style={{ height, minHeight: height, width, minWidth: width }}
        >
          {icon && (
            <span
              className={`icons8-${iconStyle} ${icon}`}
              style={{ '--i8-ratio': iconSize, '--i8-gradient': iconColor, filter: brightness }}
            ></span>
          )}
          <span>{children}</span>
        </Link>
      )
    case 'link':
      return (
        <a
          href={to}
          className={`btn ${style ? 'btn-' + style : ''} ${color}${moreClass ? ` ${moreClass}` : ''}${
            disabled ? ' disabled' : ''
          }`}
          id={id}
          onClick={(e) => onClick(e)}
          style={{ height, minHeight: height, width, minWidth: width }}
        >
          {icon && (
            <span
              className={`icons8-${iconStyle} ${icon}`}
              style={{ '--i8-ratio': iconSize, '--i8-gradient': iconColor, filter: brightness }}
            ></span>
          )}
          <span>{children}</span>
        </a>
      )

    default:
      return (
        <button
          type={type}
          className={`btn ${style ? 'btn-' + style : ''} ${color}${moreClass ? ` ${moreClass}` : ''}${
            disabled ? ' disabled' : ''
          }`}
          id={id}
          onClick={(e) => onClick(e)}
          style={{ height, minHeight: height, width, minWidth: width }}
        >
          {icon && (
            <span
              className={`icons8-${iconStyle} ${icon}`}
              style={{ '--i8-ratio': iconSize, '--i8-gradient': iconColor, filter: brightness }}
            ></span>
          )}
          <span>{children}</span>
        </button>
      )
  }
}

export default Button
