import { LazyLoadImage } from 'react-lazy-load-image-component'

const CardGroupOrder = ({ isActive = true, children }) => {
  return <div className={`card-menu-group${isActive ? ' active' : ''}`}>{children}</div>
}

const Ul = ({ isActive = true, children }) => {
  return <ul className={`${isActive ? 'active' : ''}`}>{children}</ul>
}

const Li = ({ image, alt, price, name, amount = 0, onClick = () => {}, index = null }) => {
  return (
    <li style={{ '--animation-order': index }} onClick={onClick} data-amount={`x${amount}`}>
      <div className="card-image">
        <LazyLoadImage effect="opacity" src={image} alt={alt} placeholderSrc={'/img/nofoodphoto.jpg'} />
      </div>
      <p className="price">Rp {price.toLocaleString('id-ID', { currency: 'IDR' })}</p>
      <div className="description">
        <p className="font-size-16 font-weg-700 space-06">{name.substring(0, 30)}</p>
      </div>
    </li>
  )
}

CardGroupOrder.Ul = Ul
CardGroupOrder.Li = Li
export default CardGroupOrder
