const DualForm = (props) => {
  const { content, banner, moreClass } = props
  return (
    <div className={`dual-panel-form${moreClass ? ' ' + moreClass : ''}`}>
      <div className="form-content">{content}</div>
      <div className="form-banner">{banner}</div>
    </div>
  )
}

export default DualForm
