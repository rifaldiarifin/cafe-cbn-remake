import { useSelector } from 'react-redux'
import PopupAlert from '../components/Fragments/popupAlert'
import useDarkMode from '../hooks/useDarkMode'

const PopupScreen = (props) => {
  useDarkMode()
  const popupData = useSelector((state) => state.popupScreen.data)
  return (
    <>
      {props.children}
      <div id="popupscreen" className={popupData.isActive ? 'active' : ''}>
        <PopupAlert
          titleBar={popupData.alertData.titleBar}
          title={popupData.alertData.title}
          description={popupData.alertData.description}
          alertType={popupData.alertData.alertType}
          alertStyle={popupData.alertData.alertStyle}
        ></PopupAlert>
      </div>
    </>
  )
}

export default PopupScreen
