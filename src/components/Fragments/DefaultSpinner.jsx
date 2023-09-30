const DefaultSpinner = () => {
  return (
    <div
      className="box border-box dsp-flex justify-center align-itms-center"
      style={{
        background: 'var(--overlay-color)',
        zIndex: 99,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%'
      }}
    >
      <div className="lds-ellipsis" style={{ '--ellipsis-color': 'var(--third-color)' }}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default DefaultSpinner
