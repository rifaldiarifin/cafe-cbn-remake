import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLoading } from '../redux/slice/authSlice'
import { clearDataPayload, setAlert } from '../redux/slice/popupScreenSlice'
import { addGroupChanges } from '../redux/slice/groupChangesSlice'
import { deleteGroupByID } from '../services/menu.service'
import { addActivityChanges } from '../redux/slice/activityChangesSlice'
import { me, writeActivity } from '../utils/activity'

const useDeleteGroupMenu = () => {
  const alertAction = useSelector((state) => state.popupScreen.data.alertData)
  const { userSession } = useSelector((state) => state.auth.data)
  const dispatch = useDispatch()
  useEffect(() => {
    if (alertAction.actionName === 'DELETE_GROUP_MENU' && alertAction.data) {
      const deleteMenu = async () => {
        dispatch(setIsLoading(true))
        try {
          const response = await deleteGroupByID(alertAction.data.uuid)
          await writeActivity(`${me} has removed the "${alertAction.data.groupName}" menu group`)
          dispatch(clearDataPayload())
          dispatch(setIsLoading(false))
          dispatch(
            setAlert({
              title: 'Delete Group',
              description: response.data.message,
              alertType: 'message',
              alertStyle: 'success'
            })
          )
          dispatch(addGroupChanges())
          dispatch(addActivityChanges())
        } catch (error) {
          dispatch(
            setAlert({
              title: 'Delete Group',
              description: 'Oopss.! Something when wrong :(',
              alertType: 'message',
              alertStyle: 'danger'
            })
          )
          dispatch(addGroupChanges())
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

export default useDeleteGroupMenu
