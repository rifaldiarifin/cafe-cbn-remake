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
      <Button
        icon="subtract"
        iconSize={'16px'}
        moreClass={'icon'}
        height={'100%'}
        onClick={(e) => (onClickDown ? onClickDown(e) : spinDown(e))}
      ></Button>
      <span className="spin-value" data-spinvalue={value || spinvalue}></span>
      <Button
        icon="plus-math"
        iconSize={'16px'}
        moreClass={'icon'}
        height={'100%'}
        onClick={(e) => (onClickUp ? onClickUp(e) : spinUp(e))}
      ></Button>
    </div>
  )
}

export default Spinning
