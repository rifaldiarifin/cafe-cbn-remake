import useSlideChange from '../../../hooks/useSlideChange'

const BannerPromote = (props) => {
  const { children, bannerData, startIndex, reverse, delay } = props
  const data = useSlideChange({ count: bannerData.length - 1, startIndex, reverse, delay })
  const setStyle = {
    '--count-banner': `${bannerData.length}`,
    '--index-banner': `${data.index}`
  }
  return (
    <div className="banner-promote" style={setStyle}>
      <div className="bg-banner">{children}</div>
      <div className="dot-group">
        {bannerData.map((_, i) => (
          <span key={i} className={`dot-indic ${data.dot[i] ? 'active' : ''}`}></span>
        ))}
      </div>
    </div>
  )
}

export default BannerPromote
