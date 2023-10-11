import Button from '../components/Elements/Button'
import { useDocumentTitle } from '../hooks/useDocumentHandler'

const Page404 = () => {
  useDocumentTitle('404')
  return (
    <div className="page-404">
      <div className="box dsp-flex fl-colm justify-center align-itms-center">
        <div className="char-404">
          4<span className="searchicon" />4
        </div>
        <h1>Page not found</h1>
        <p>&</p>
        <Button type="hyperlink" to="/" style="fill" color="classic" height="50px">
          Back to Home
        </Button>
      </div>
    </div>
  )
}

export default Page404
