import Spinning from '../Elements/Spinning'

const CartList = ({ children }) => {
  return (
    <div className="content-payment">
      <ul>{children}</ul>
    </div>
  )
}

const Li = ({ name, price, qty, onClickSpinUp = () => {}, onClickRemove = () => {}, onClickSpinDown = () => {} }) => {
  return (
    <li>
      <div className="box dsp-flex fl-colm gap-6 overflow-hidden">
        <h4 className="font-size-18 font-weg-600 text-elips nowrap">{name}</h4>
        <p className="font-size-13 disabled-text-2 font-weg-600 text-elips nowrap">-</p>
      </div>
      <div className="box dsp-flex align-itms-center gap-20 justify-self-end">
        <div className="box dsp-flex fl-colm gap-4">
          <p className="font-size-18 font-weg-600">Rp {(price * qty).toLocaleString('id-ID', { currency: 'IDR' })}</p>
          <p className="font-size-13 disabled-text-1">Rp {price.toLocaleString('id-ID', { currency: 'IDR' })}</p>
        </div>
        <Spinning value={qty} onClickUp={onClickSpinUp} onClickDown={onClickSpinDown}></Spinning>
        <button className="remove-order" onClick={onClickRemove}>
          <span className="icons8-regular trash"></span>
        </button>
      </div>
    </li>
  )
}

CartList.Li = Li
export default CartList
