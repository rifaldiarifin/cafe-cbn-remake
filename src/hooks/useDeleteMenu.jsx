import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLoading } from '../redux/slice/authSlice'
import { clearDataPayload, setAlert } from '../redux/slice/popupScreenSlice'
import { addMenuChanges } from '../redux/slice/menuChangesSlice'
import { deleteMenuDataByID } from '../services/menu.service'
import { addActivityChanges } from '../redux/slice/activityChangesSlice'
import { me, writeActivity } from '../utils/activity'

const useDeleteMenu = () => {
  const alertAction = useSelector((state) => state.popupScreen.data.alertData)
  const { userSession } = useSelector((state) => state.auth.data)
  const dispatch = useDispatch()
  useEffect(() => {
    if (alertAction.actionName === 'deleteMenu' && alertAction.data) {
      const deleteMenu = async () => {
        dispatch(setIsLoading(true))
        try {
          const response = await deleteMenuDataByID(alertAction.data.uuid)
          await writeActivity(`${me} has removed "${alertAction.data.name}" menu`)
          dispatch(clearDataPayload())
          dispatch(setIsLoading(false))
          dispatch(
            setAlert({
              title: 'Delete Menu',
              description: response.data.message,
              alertType: 'message',
              alertStyle: 'success'
            })
          )
          dispatch(addActivityChanges())
          dispatch(addMenuChanges())
        } catch (error) {
          dispatch(
            setAlert({
              title: 'Delete Menu',
              description: 'Oopss.! Something when wrong :(',
              alertType: 'message',
              alertStyle: 'danger'
            })
          )
          dispatch(clearDataPayload())
          dispatch(setIsLoading(false))
        }
      }
      if (alertAction.action.yes) {
        deleteMenu()
      }
    }
  }, [alertAction.action.yes, alertAction.actionName, alertAction.data, dispatch, userSession])
}

export default useDeleteMenu
