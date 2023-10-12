import Button from '../components/Elements/Button'

const CommingSoon = (props) => {
  const { type = 'link', to = '/' } = props
  return (
    <div className="box dsp-flex fl-colm align-itms-center h-100">
      <img
        src="/img/coffee_building_18776.svg"
        alt="png image from pngtree.com"
        style={{ height: '100%', maxHeight: '400px', objectFit: 'contain', transform: 'scale(1.3)' }}
      />
      <div className="box dsp-flex fl-colm align-itms-center gap-20">
        <h2 className="font-size-32 font-weg-500 text-center">Comming Soon</h2>
        <p className="disabled-text-1 text-center">We are currently working hard building this page!</p>
        <Button type={type} to={to} style="fill" color="second">
          Back to Home
        </Button>
      </div>
    </div>
  )
}

export default CommingSoon
