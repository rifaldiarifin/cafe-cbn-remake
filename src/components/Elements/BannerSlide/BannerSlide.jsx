const BannerSlide = (props) => {
  const { bgImgBlur = false, containImage = false, source, alt } = props
  return (
    <div className="slide-banner">
      {bgImgBlur && <img className="bg-img" src={source} alt={alt} />}
      <img className={`front-img${containImage ? ' contain' : ''}`} src={source} alt={alt} />
    </div>
  )
}

export default BannerSlide
