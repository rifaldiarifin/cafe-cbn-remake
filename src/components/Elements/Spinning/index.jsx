import Button from '../Button'

const Spinning = (props) => {
  const { value, onClickUp, onClickDown } = props
  let spinvalue = 0
  const spinUp = (e) => {
    if (spinvalue >= 99) return
    spinvalue = spinvalue + 1
    const spinValue = e.target.previousElementSibling
    spinValue.dataset.spinvalue = spinvalue
  }
  const spinDown = (e) => {
    if (spinvalue <= 1) return
    spinvalue = spinvalue - 1
    const spinValue = e.target.nextElementSibling
    spinValue.dataset.spinvalue = spinvalue
  }
  return (
    <div className="spinning-number">
      <Button icon="subtract" onClick={(e) => (onClickDown ? onClickDown(e) : spinDown(e))}></Button>
      <span className="spin-value" data-spinvalue={value || spinvalue}></span>
      <Button icon="plus-math" onClick={(e) => (onClickUp ? onClickUp(e) : spinUp(e))}></Button>
    </div>
  )
}

export default Spinning
