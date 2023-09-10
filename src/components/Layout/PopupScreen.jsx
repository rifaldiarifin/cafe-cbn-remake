const PopupScreen = (props) => {
  const { children, active = false } = props
  return (
    <div id="popupscreen" className={active ? 'active' : ''}>
      {children}
    </div>
  )
}

export default PopupScreen
