import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setIsLoading } from '../redux/slice/authSlice'
import { clearDataPayload, setAlert } from '../redux/slice/popupScreenSlice'
import { addUserChanges } from '../redux/slice/userChangesSlice'
import { deleteUserByID } from '../services/users.service'
import { addActivityChanges } from '../redux/slice/activityChangesSlice'
import { me, writeActivity } from '../utils/activity'

const useDeleteAccount = () => {
  const alertAction = useSelector((state) => state.popupScreen.data.alertData)
  const { userSession } = useSelector((state) => state.auth.data)
  const dispatch = useDispatch()

  useEffect(() => {
    if (alertAction.actionName === 'deleteAccount' && alertAction.data) {
      const deleteAccount = async () => {
        dispatch(setIsLoading(true))
        if (userSession && userSession.uuid === alertAction.data) {
          dispatch(setIsLoading(false))
          throw new Error("Can't delete current account signed!")
        }
        try {
          const response = await deleteUserByID(alertAction.data.uuid)
          await writeActivity(`${me} has deleted account with the username "${alertAction.data.username}"`)
          dispatch(clearDataPayload())
          dispatch(setIsLoading(false))
          dispatch(
            setAlert({
              title: 'Delete Account',
              description: response.data.message,
              alertType: 'message',
              alertStyle: 'success'
            })
          )
          dispatch(addUserChanges())
          dispatch(addActivityChanges())
        } catch (error) {
          dispatch(
            setAlert({
              title: 'Delete Account',
              description: 'Oopss.! Something when wrong :(',
              alertType: 'message',
              alertStyle: 'danger'
            })
          )
          dispatch(addUserChanges())
          dispatch(clearDataPayload())
          dispatch(setIsLoading(false))
        }
      }
      if (alertAction.action.yes) {
        deleteAccount()
      }
    }
  }, [alertAction.action.yes, alertAction.actionName, alertAction.data, dispatch, userSession])
}

export default useDeleteAccount
