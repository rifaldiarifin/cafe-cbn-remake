import Button from '../components/Elements/Button'

const Unauthorize = () => {
  return (
    <div className="unauthorize-page">
      <div className="box dsp-flex fl-colm justify-center align-itms-center">
        <div className="char-401">
          4<span className="lockicon" />1
        </div>
        <h1>-Unauthorized</h1>
        <p>Refreshing this page</p>
        <p>&</p>
        <Button type="hyperlink" to="/auth/signin" style="fill" color="classic" height="50px">
          Login Again
        </Button>
      </div>
    </div>
  )
}

export default Unauthorize
