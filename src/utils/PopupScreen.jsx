import { useSelector } from 'react-redux'
import PopupAlert from '../components/Fragments/popupAlert'
import useDarkMode from '../hooks/useDarkMode'
import Spinner from '../components/Fragments/Spinner'
import Loading from '../pages/loading'

const PopupScreen = (props) => {
  useDarkMode()
  const popupData = useSelector((state) => state.popupScreen.data)
  const { isLoading } = useSelector((state) => state.auth.data)
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
      <Spinner isLoading={isLoading} />
      <Loading />
    </>
  )
}

export default PopupScreen
