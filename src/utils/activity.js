import { createActivity, getActivityData, getMyActivity } from '../services/activity.service'
import { customTryCatch } from './tryCatch'
import jwtDecode from 'jwt-decode'

export const me = '%us3r%'

const parseActivity = (stringActivity, dataUser, backupFullname) => {
  const accessToken = localStorage.getItem('access_token')
  const decoded = accessToken ? jwtDecode(accessToken) : null
  const newUserData = {
    data: {
      name: backupFullname,
      profileImage: 'noavatar',
      deleted: true
    }
  }

  if (dataUser !== null) {
    newUserData.data.name =
      dataUser?.lastname.length > 0 ? `${dataUser?.firstname} ${dataUser?.lastname}` : `${dataUser?.firstname}`
    newUserData.data.profileImage = dataUser?.profileImage
    newUserData.data.deleted = false
  }
  if (dataUser !== null && dataUser?.uuid === decoded?.uuid) {
    newUserData.data.name = 'You'
    newUserData.data.deleted = false
  }

  return {
    deleted: newUserData.data.deleted,
    stringName: stringActivity.toString().replaceAll(me, newUserData.data.name),
    profileImage: newUserData.data.profileImage
  }
}

export const writeActivity = async (typeYourActivity) => {
  return await createActivity({ activity: typeYourActivity })
}

export const readAllActivity = async () => {
  return customTryCatch(async () => {
    const activityData = await getActivityData()
    return activityData.data.result.reduce((prev, curr) => {
      const { profileImage, deleted, stringName } = parseActivity(curr.activity, curr.user.data, curr.user.fullname)
      return (prev = [
        ...prev,
        {
          ...curr,
          activity: stringName,
          user: {
            ...curr.user,
            data: {
              profileImage
            },
            deleted
          }
        }
      ])
    }, [])
  })
}

export const readMyActivity = async () => {
  return customTryCatch(async () => {
    const myActivity = await getMyActivity()
    return myActivity.data.result.reduce((prev, curr) => {
      const { deleted, profileImage, stringName } = parseActivity(curr.activity, curr.user.data, curr.user.fullname)
      return (prev = [
        ...prev,
        {
          ...curr,
          activity: stringName,
          user: {
            ...curr.user,
            data: {
              profileImage
            },
            deleted
          }
        }
      ])
    }, [])
  })
}
