import { createActivity, getActivityData, getMyActivity } from '../services/activity.service'
import { customTryCatch } from './tryCatch'
import jwtDecode from 'jwt-decode'

export const me = '%us3r%'

const parseActivity = (stringActivity, dataUser, backupFullname) => {
  const accessToken = localStorage.getItem('access_token')
  const decoded = accessToken ? jwtDecode(accessToken) : null
  const fullname = {
    data: backupFullname
  }
  if (dataUser) {
    fullname.data =
      dataUser?.lastname.length > 0 ? `${dataUser?.firstname} ${dataUser?.lastname}` : `${dataUser?.firstname}`
  }
  if (dataUser.uuid === decoded?.uuid) {
    fullname.data = 'You'
  }
  return stringActivity.toString().replaceAll(me, fullname.data)
}

export const writeActivity = async (typeYourActivity) => {
  return await createActivity({ activity: typeYourActivity })
  // try {
  //     await createActivity({ activity: typeYourActivity })
  // } catch (error) {
  //     if (!error.response) {
  //         console.error('Error: No Server Response! :(')
  //     } else if (error?.response?.data?.message) {
  //         console.error('Error: ', error?.response?.data?.message)
  //     } else {
  //         console.log('Error: ', error.message)
  //     }
  // }
}

export const readAllActivity = async () => {
  return customTryCatch(async () => {
    const activityData = await getActivityData()
    return activityData.data.result.reduce((prev, curr) => {
      const newActivityString = parseActivity(curr.activity, curr.user.data, curr.user.fullname)
      return (prev = [...prev, { ...curr, activity: newActivityString }])
    }, [])
  })
}

export const readMyActivity = async () => {
  return customTryCatch(async () => {
    const myActivity = await getMyActivity()
    return myActivity.data.result.reduce((prev, curr) => {
      const newActivityString = parseActivity(curr.activity, curr.user.data, curr.user.fullname)
      return (prev = [...prev, { ...curr, activity: newActivityString }])
    }, [])
  })
}
