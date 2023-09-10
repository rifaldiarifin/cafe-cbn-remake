import { useDispatch } from 'react-redux'
import Button from '../Elements/Button'
import { clickNo, clickOK, clickYes, closePopup } from '../../redux/slice/popupScreenSlice'

const PopupAlert = (props) => {
  const dispatch = useDispatch()
  const {
    titleBar = 'Hello World',
    title = 'Hello World',
    description = 'Yoo Watsupppp bro :D',
    alertType = 'message',
    alertStyle = 'info',
    action = {
      close: () => {
        dispatch(closePopup())
      },
      ok: () => {
        dispatch(clickOK())
        setTimeout(() => {
          dispatch(closePopup())
        }, 100)
      },
      yes: () => {
        dispatch(clickYes())
        setTimeout(() => {
          dispatch(closePopup())
        }, 100)
      },
      no: () => {
        dispatch(clickNo())
        setTimeout(() => {
          dispatch(closePopup())
        }, 100)
      }
    }
  } = props

  switch (alertType) {
    case 'message':
      return (
        <div className={`alert-window ${alertStyle}`}>
          <div className="header-alert">
            <h2>{titleBar}</h2>
            <span className="close icons8-regular delete" onClick={action.close}></span>
          </div>
          <div className="content-alert">
            <span className="icon-alert"></span>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
          <div className="footer-alert">
            <Button style="fill" color={alertStyle} onClick={action.ok}>
              OK
            </Button>
          </div>
        </div>
      )
    case 'confirm':
      return (
        <div className={`alert-window ${alertType} ${alertStyle}`}>
          <div className="header-alert">
            <h2>{titleBar}</h2>
            <span className="close icons8-regular delete" onClick={action.close}></span>
          </div>
          <div className="content-alert">
            <span className="icon-alert"></span>
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
          <div className="footer-alert">
            <Button style="fill" color={alertStyle} onClick={action.yes}>
              Yes
            </Button>
            <Button style="regular" color={alertStyle} onClick={action.no}>
              No
            </Button>
          </div>
        </div>
      )
    default:
      break
  }
}

export default PopupAlert
