import { imageDB } from '../../config/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useDispatch, useSelector } from 'react-redux'
import { closeFormGroup, closeFormGroupMenus, closeFormMenu, closeFormUser } from '../../redux/slice/popupForm'
import { v4 as uuidv4 } from 'uuid'
import Button from '../Elements/Button'
import InputField from '../Elements/InputField'
import InputCircleImage from '../Elements/InputImageCircle'
import SimpleCombobox from '../Elements/SimpleCombobox'
import SimpleComboLi from '../Elements/SimpleCombobox/SimpleComboLi'
import { useState } from 'react'
import DefaultSpinner from './DefaultSpinner'
import { setAlert } from '../../redux/slice/popupScreenSlice'
import { addUserChanges } from '../../redux/slice/userChangesSlice'
import { addMenuChanges } from '../../redux/slice/menuChangesSlice'
import { addGroupChanges } from '../../redux/slice/groupChangesSlice'
import AdminPanelUI2 from '../Layout/AdminPanelUI2'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import InputCheckbox from '../Elements/InputCheckbox'
import useCollectChecked from '../../hooks/useCollectChecked'
import useFindingMenus from '../../hooks/useFindingMenus'
import { createUser, updateUserByID } from '../../services/users.service'
import { me, writeActivity } from '../../utils/activity'
import {
  createMenu as createNewMenu,
  createGroupMenu,
  updateGroupMenuByID,
  updateMenuByID,
  updateMenusInGroupByID
} from '../../services/menu.service'
import { addActivityChanges } from '../../redux/slice/activityChangesSlice'
import getImage from '../../utils/getImage'

export const FormUser = () => {
  const [formMessage, setFormMessage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const popupForm = useSelector((state) => state.popupForm.data)
  const dispatch = useDispatch()

  const saveForm = async (e) => {
    e.preventDefault()
    setFormMessage(false)
    const userData = {
      firstname: e.target.firstname,
      lastname: e.target.lastname,
      username: e.target.username,
      profileImage: e.target.profileimage,
      password: e.target.password,
      role: e.target.role,
      email: e.target.email,
      phone: e.target.phone
    }

    const recapFormData = (data) => {
      return {
        firstname: data.firstname,
        lastname: data.lastname,
        username: data.username,
        userAccess: {
          role: data.role.toLowerCase()
        },
        userContact: {
          email: data.email,
          phone: data.phone
        }
      }
    }
    // Validate Function
    const validate = async (obj) => {
      const collect = {
        data: {}
      }
      const entries = await Object.entries(obj).map((data) => {
        if (popupForm.formUser.action === 'create') {
          switch (data[0]) {
            // validate profileimage
            case 'profileImage':
              if (
                data[1].value.length > 0 &&
                !data[1].accept.includes(data[1].files[0].type !== '' && data[1].files[0].type)
              ) {
                setFormMessage("It's not a picture!")
                return [data[0], false]
              }
              if (data[1].value.length > 0 && data[1].files[0].size >= 300000) {
                setFormMessage('Image size must under 300KB!')
                return [data[0], false]
              }
              return [data[0], data[1].files[0] ?? '']

            // validate role
            case 'role':
              return [data[0], data[1].value]

            default:
              // validate other input
              if (!data[1].parentElement.parentElement.classList.contains('inputfield')) return [data[0], false]
              if (data[1].parentElement.parentElement.classList.contains('invalid')) return [data[0], false]
              if (data[1].value === '' && data[0] !== 'lastname' && data[0] !== 'email' && data[0] !== 'phone') {
                InputField.SetMessage('Cannot be empty!', data[1].parentElement.parentElement, true)
                return [data[0], false]
              }
              if (data[1].value === '' && data[0] !== 'email') {
                return [data[0], '']
              }
              if (data[1].value === '' && data[0] !== 'phone') {
                return [data[0], '']
              }
              if (data[0] === 'lastname' && data[1].value === '') {
                return [data[0], '']
              }
              return [data[0], data[1].value]
          }
        } else {
          switch (data[0]) {
            // validate profileimage
            case 'profileImage':
              if (
                data[1].value.length > 0 &&
                !data[1].accept.includes(data[1].files[0].type !== '' && data[1].files[0].type)
              ) {
                setFormMessage("It's not a picture!")
                return [data[0], false]
              }
              if (data[1].value.length > 0 && data[1].files[0].size >= 300000) {
                setFormMessage('Image size must under 300KB!')
                return [data[0], false]
              }
              return [data[0], data[1].files[0] ?? '']

            // validate role
            case 'role':
              return [data[0], data[1].value]

            default:
              // validate other input
              if (!data[1].parentElement.parentElement.classList.contains('inputfield')) return
              if (data[1].parentElement.parentElement.classList.contains('invalid')) return [data[0], false]
              if (data[1].value === '' && (data[0] === 'firstname' || data[0] === 'username')) {
                InputField.SetMessage('Cannot be empty!', data[1].parentElement.parentElement, true)
                return [data[0], false]
              }
              return [data[0], data[1].value]
          }
        }
      })
      if (entries.find((data) => data[1] === false)) return false

      entries.map((entry) => {
        if (entry[0] === 'password' && entry[1].length === 0) return
        if (entry[0] === 'profileImage' && entry[1].length === 0) return
        collect.data = { ...collect.data, [entry[0]]: entry[1] }
      })
      return collect.data
    }
    const validateForm = await validate(userData)
    if (!validateForm) return

    let recollectFormData = { ...recapFormData(validateForm) }

    try {
      setIsLoading(true)
      if (validateForm.password) {
        recollectFormData = { ...recollectFormData, password: validateForm.password }
      }
      if (validateForm.profileImage) {
        const splitExtentionFile = validateForm.profileImage.name.split('.')
        const imgName = `${uuidv4()}.${splitExtentionFile[splitExtentionFile.length - 1]}`
        const imgRef = ref(imageDB, `img/avatars/${imgName}`)
        await uploadBytes(imgRef, validateForm.profileImage).then(async () => {
          await getDownloadURL(imgRef).then((image) => {
            recollectFormData = { ...recollectFormData, profileImage: `${image}` }
          })
        })
      } else {
        recollectFormData = { ...recollectFormData, profileImage: 'noavatar' }
      }

      if (popupForm.formUser.action === 'create') {
        await createUser(recollectFormData)
        await writeActivity(`${me} added a new account`)
      } else {
        await updateUserByID(popupForm.formUser.formData.uuid, recollectFormData)
        await writeActivity(`${me} made changes to the "${recollectFormData.username}" account`)
      }

      setIsLoading(false)
      dispatch(closeFormUser())
      dispatch(addUserChanges())
      dispatch(addActivityChanges())
    } catch (error) {
      if (error.response.status === 409) {
        setFormMessage(error.response.data.message)
        setIsLoading(false)
        return
      }
      setFormMessage(error.response.data.message)
      setIsLoading(false)
    }
  }

  const closeForm = () => {
    dispatch(closeFormUser())
    setFormMessage(false)
  }
  return (
    <div className="popupform" style={{ display: !popupForm.status && 'none' }}>
      {popupForm.status && (
        <div className="formcard" style={{ overflow: 'hidden' }}>
          {isLoading ? (
            <>
              <DefaultSpinner />
            </>
          ) : null}
          <form
            action=""
            method="post"
            className="formcard"
            onSubmit={saveForm}
            style={{ display: !popupForm.formUser.status && 'none' }}
            // style={{opacity: isLoading ? '0' : null}}
          >
            <span className="close icons8-regular delete" onClick={closeForm}></span>
            <div className="box dsp-flex justify-center pad-t-20 pad-x-20 border-box w-100">
              <h2 className="font-size-24 font-weg-600 accent-col-1">
                {popupForm.formUser.action === 'create' ? 'New Account' : 'Edit Account'}
              </h2>
            </div>
            <div className="box dsp-flex justify-center pad-20 pad-x-20 pad-t-20 border-box w-100">
              <InputCircleImage
                src={
                  popupForm.formUser.formData.profileImage === 'noavatar'
                    ? '/img/noavatar.jpg'
                    : popupForm.formUser.formData.profileImage
                }
                id="profileimage"
                name="profileimage"
              />
            </div>
            <div className="box dsp-flex fl-colm justify-start w-100 border-box align-itms-start gap-10 pad-20 pad-x-20">
              <div className="box dsp-flex align-itms-center gap-10 w-100">
                <InputField
                  type="text"
                  label="First Name"
                  id="firstname"
                  value={popupForm.formUser.action === 'update' ? popupForm.formUser.formData.firstname : ''}
                  name="firstname"
                  placeHolder="First Name"
                  width="100%"
                  required={popupForm.formUser.action === 'create' ? true : false}
                  autoComplete="off"
                />
                <InputField
                  type="text"
                  label="Last Name"
                  id="lastname"
                  value={popupForm.formUser.action === 'update' ? popupForm.formUser.formData.lastname : ''}
                  name="lastname"
                  placeHolder="Last Name"
                  width="100%"
                  autoComplete="off"
                />
              </div>
              <div className="box dsp-flex align-itms-center gap-10 w-100">
                <InputField
                  type="text"
                  label="Username"
                  id="username"
                  value={popupForm.formUser.action === 'update' ? popupForm.formUser.formData.username : ''}
                  name="username"
                  placeHolder="Username"
                  min={8}
                  width="100%"
                  required={popupForm.formUser.action === 'create' ? true : false}
                  autoComplete="off"
                />
                <div className="box">
                  <p className="font-main font-weg-600 space-08 mrgn-b-6" style={{ fontSize: '15px' }}>
                    Role
                  </p>
                  <SimpleCombobox
                    id="role"
                    name="role"
                    select={
                      popupForm.formUser.action === 'update' ? popupForm.formUser.formData.access.role : 'Regular'
                    }
                    styleBox="fill"
                    fullRadius
                  >
                    <SimpleComboLi value="Regular" />
                    <SimpleComboLi value="Manager" />
                    <SimpleComboLi value="Machine" />
                    <SimpleComboLi value="Kitchen" />
                    <SimpleComboLi value="Cashier" />
                    <SimpleComboLi value="Admin" />
                  </SimpleCombobox>
                </div>
              </div>
              <InputField
                type="email"
                label="Email"
                id="email"
                value={popupForm.formUser.action === 'update' ? popupForm.formUser.formData.contact.email : ''}
                name="email"
                placeHolder="Email"
                width="100%"
                autoComplete="off"
              />
              <InputField
                type="phoneID"
                label="Phone"
                id="phone"
                value={popupForm.formUser.action === 'update' ? popupForm.formUser.formData.contact.phone : ''}
                name="phone"
                placeHolder="Phone"
                width="100%"
                autoComplete="off"
              />
              <InputField
                type="password"
                label="Password"
                id="password"
                name="password"
                placeHolder="Password"
                min={8}
                width="100%"
                required={popupForm.formUser.action === 'create' ? true : false}
                autoComplete="off"
              />
            </div>
            {formMessage && (
              <div className="box pad-x-20 text-center border-box w-100">
                <p className="font-size-14 font-weg-600" style={{ color: 'var(--danger-color)' }}>
                  {formMessage}
                </p>
              </div>
            )}
            <div className="box dsp-flex justify-center mrgn-t-10 pad-20 w-100 border-box">
              <Button type="submit" style="fill" color="second" width={'250px'}>
                Save
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export const FormMenu = () => {
  const [formMessage, setFormMessage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const popupForm = useSelector((state) => state.popupForm.data)
  const formData = popupForm?.formMenu?.formData
  const dispatch = useDispatch()

  const closeForm = () => {
    setFormMessage(false)
    dispatch(closeFormMenu())
  }

  const createMenu = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const collectInput = () => {
      const newCollect = {
        data: {}
      }
      for (let x = 0; x < e.target.length; x++) {
        const element = e.target[x]
        if (element.id.length > 0) {
          newCollect.data = { ...newCollect.data, [element.id]: element }
        }
      }
      return newCollect.data
    }

    const validate = async (formdata) => {
      const collect = {
        data: {}
      }
      const entries = await Object.entries(formdata).map((data) => {
        switch (data[0]) {
          // validate profileimage
          case 'image':
            if (
              data[1]?.value?.length > 0 &&
              !data[1].accept.includes(data[1].files[0].type !== '' && data[1].files[0].type)
            ) {
              setFormMessage("It's not a picture!")
              return [data[0], false]
            }
            if (data[1]?.value?.length > 0 && data[1].files[0].size >= 300000) {
              setFormMessage('Image size must under 300KB!')
              return [data[0], false]
            }
            return [data[0], data[1].files[0] ?? '']

          default:
            // validate other input
            if (!data[1]?.parentElement?.parentElement?.classList.contains('inputfield')) return [data[0], false]
            if (data[1]?.parentElement?.parentElement?.classList.contains('invalid')) return [data[0], false]
            if (data[1].value === '' && data[0] !== 'contents') {
              InputField.SetMessage('Cannot be empty!', data[1]?.parentElement?.parentElement, true)
              return [data[0], false]
            }
            if (data[1].value === '' && data[0] !== 'contents') {
              return [data[0], '']
            }
            return [data[0], data[1].value]
        }
      })
      if (entries.find((entry) => entry[1] === false)) return false

      entries.map((entry) => {
        if (entry[0] === 'contents' && entry[1].length === 0) return
        if (entry[0] === 'image' && entry[1].length === 0) return
        collect.data = { ...collect.data, [entry[0]]: entry[1] }
      })
      return collect.data
    }
    const formdata = await validate(collectInput())
    if (!formdata) return setIsLoading(false)
    const validateForm = { ...formdata }

    try {
      if (validateForm.image) {
        const splitExtentionFile = validateForm.image.name.split('.')
        const imgName = `${uuidv4()}.${splitExtentionFile[splitExtentionFile.length - 1]}`
        await uploadBytes(ref(imageDB, `/img/menu_images/${imgName}`), validateForm.image).then(async () => {
          await getDownloadURL(ref(imageDB, `/img/menu_images/${imgName}`)).then((image) => {
            validateForm.image = image
          })
        })
      }

      if (popupForm.formMenu.action === 'create') {
        await createNewMenu(validateForm)
        await writeActivity(`${me} added a new menu "${validateForm.name}"`)
      } else {
        await updateMenuByID(formData.uuid, validateForm)
        await writeActivity(`${me} made changes to the "${validateForm.name}" menu`)
      }
      setIsLoading(false)
      dispatch(addMenuChanges())
      dispatch(addActivityChanges())
      closeForm()
    } catch (error) {
      if (!error.response) {
        dispatch(
          setAlert({
            title: 'New Menu',
            description: 'No Server Response :(, Try again later.',
            alertType: 'message',
            alertStyle: 'danger'
          })
        )
        setIsLoading(false)
        setFormMessage('No Server Response')
        return
      } else if (error?.response?.data?.message) {
        setIsLoading(false)
        setFormMessage(error?.response?.data?.message)
      } else {
        setIsLoading(false)
        setFormMessage('Oopss..! Something when wrong :(')
      }
      setIsLoading(false)
    }
  }

  return (
    <div className="popupform" style={{ display: !popupForm.status && 'none' }}>
      {popupForm.status && (
        <div className="formcard" style={{ overflow: 'hidden' }}>
          {isLoading ? (
            <>
              <DefaultSpinner />
            </>
          ) : null}
          <form
            action=""
            method="post"
            className="formcard"
            style={{ display: !popupForm.formMenu.status && 'none' }}
            onSubmit={createMenu}
          >
            <span className="close icons8-regular delete" onClick={closeForm}></span>
            <div className="box dsp-flex justify-center pad-t-20 pad-x-20 border-box w-100">
              <h2 className="font-size-24 font-weg-600 accent-col-1">
                {popupForm.formMenu.action === 'create' ? 'New Menu' : 'Edit Menu'}
              </h2>
            </div>
            <div className="box dsp-flex fl-colm justify-start w-100 border-box align-itms-start gap-10 pad-20 pad-t-20 pad-x-20">
              <div className="box dsp-flex w-100 border-box justify-between gap-30">
                <InputCircleImage size="80px" id="image" src={formData?.image} name="image" />
                <div className="dsp-flex fl-colm justify-start fl-1 border-box align-itms-start gap-10">
                  <InputField
                    type="text"
                    label="Menu Name"
                    name="name"
                    id="name"
                    value={formData?.name ?? ''}
                    placeHolder="My Coffee"
                    width="100%"
                    required
                  />
                  <InputField
                    type="currencyIDR"
                    label="Price"
                    name="price"
                    id="price"
                    value={formData?.price ?? ''}
                    placeHolder="1000"
                    width="100%"
                    required
                  />
                </div>
              </div>
              <InputField
                type="text"
                label="Contents"
                name="contents"
                id="contents"
                value={formData?.contents ?? ''}
                placeHolder="Foam / Milk / etc."
                width="100%"
              />
            </div>
            {formMessage && (
              <div className="box pad-x-20 text-center border-box w-100">
                <p className="font-size-14 font-weg-600" style={{ color: 'var(--danger-color)' }}>
                  {formMessage}
                </p>
              </div>
            )}
            <div className="box dsp-flex justify-center mrgn-t-10 pad-20 w-100 border-box">
              <Button type="submit" style="fill" color="second" width={'250px'}>
                Save
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export const FormGroup = () => {
  const [formMessage, setFormMessage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const popupForm = useSelector((state) => state.popupForm.data)
  const formData = popupForm.formGroup.formData
  const dispatch = useDispatch()

  const closeForm = () => {
    setFormMessage(false)
    dispatch(closeFormGroup())
  }

  const createGroup = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const collectInput = () => {
      const newCollect = {
        data: {}
      }
      for (let x = 0; x < e.target.length; x++) {
        const element = e.target[x]
        if (element.id.length > 0) {
          newCollect.data = { ...newCollect.data, [element.id]: element }
        }
      }
      return newCollect.data
    }

    const validate = async (formdata) => {
      const collect = {
        data: {}
      }
      const entries = await Object.entries(formdata).map((data) => {
        switch (data[0]) {
          // validate profileimage
          case 'image':
            if (
              data[1].value.length > 0 &&
              !data[1].accept.includes(data[1].files[0].type !== '' && data[1].files[0].type)
            ) {
              setFormMessage("It's not a picture!")
              return [data[0], false]
            }
            if (data[1].value.length > 0 && data[1].files[0].size >= 300000) {
              setFormMessage('Image size must under 300KB!')
              return [data[0], false]
            }
            return [data[0], data[1].files[0] ?? '']

          default:
            // validate other input
            if (!data[1].parentElement.parentElement.classList.contains('inputfield')) return [data[0], false]
            if (data[1].parentElement.parentElement.classList.contains('invalid')) return [data[0], false]
            if (data[1].value === '') {
              InputField.SetMessage('Cannot be empty!', data[1].parentElement.parentElement, true)
              return [data[0], false]
            }
            return [data[0], data[1].value]
        }
      })
      if (entries.find((entry) => entry[1] === false)) return false

      entries.map((entry) => {
        if (entry[0] === 'image' && entry[1].length === 0) return
        collect.data = { ...collect.data, [entry[0]]: entry[1] }
      })
      return collect.data
    }

    const formdata = await validate(collectInput())
    if (!formdata) return setIsLoading(false)
    const validateForm = { ...formdata }

    try {
      if (validateForm.image) {
        const splitExtentionFile = validateForm.image.name.split('.')
        const imgName = `${uuidv4()}.${splitExtentionFile[splitExtentionFile.length - 1]}`
        await uploadBytes(ref(imageDB, `/img/menu_groups/${imgName}`), validateForm.image).then(async () => {
          await getDownloadURL(ref(imageDB, `/img/menu_groups/${imgName}`)).then((res) => {
            validateForm.image = res
          })
        })
      }
      if (popupForm.formGroup.action === 'create') {
        await createGroupMenu(validateForm)
        await writeActivity(`${me} added a new menu group "${validateForm.groupName}"`)
      } else {
        await updateGroupMenuByID(formData.uuid, validateForm)
        await writeActivity(`${me} made changes to the "${validateForm.groupName}" menu group`)
      }
      setIsLoading(false)
      dispatch(addGroupChanges())
      dispatch(addActivityChanges())
      closeForm()
    } catch (error) {
      if (!error.response) {
        dispatch(
          setAlert({
            title: 'New Menu',
            description: 'No Server Response :(, Try again later.',
            alertType: 'message',
            alertStyle: 'danger'
          })
        )
        setIsLoading(false)
        setFormMessage('No Server Response')
        return
      } else if (error?.response?.data?.message) {
        setIsLoading(false)
        setFormMessage(error?.response?.data?.message)
      } else {
        setIsLoading(false)
        setFormMessage('Oopss..! Something when wrong :(')
      }
      setIsLoading(false)
    }
  }
  return (
    <div className="popupform" style={{ display: !popupForm.formGroup.status && 'none' }}>
      {popupForm.formGroup.status && (
        <div className="formcard" style={{ overflow: 'hidden' }}>
          {isLoading ? (
            <>
              <DefaultSpinner />
            </>
          ) : null}
          <form
            action=""
            method="post"
            className="formcard"
            style={{ display: !popupForm.formGroup.status && 'none' }}
            onSubmit={createGroup}
          >
            <span className="close icons8-regular delete" onClick={closeForm}></span>
            <div className="box dsp-flex justify-center pad-t-20 pad-x-20 border-box w-100">
              <h2 className="font-size-24 font-weg-600 accent-col-1">
                {popupForm.formGroup.action === 'create' ? 'New Group' : 'Edit Group'}
              </h2>
            </div>
            <div className="box dsp-flex fl-colm justify-start w-100 border-box align-itms-start gap-10 pad-20 pad-t-20 pad-x-20">
              <div className="box dsp-flex w-100 border-box justify-center gap-30">
                <InputCircleImage
                  size="80px"
                  id="image"
                  src={formData?.image && getImage(formData?.image, 'nofoodphoto')}
                  name="image"
                />
              </div>
              <InputField
                type="text"
                label="Group Name"
                name="groupname"
                id="groupName"
                value={formData?.groupName ?? ''}
                placeHolder="Hot Sales Group"
                width="100%"
                required
              />
            </div>
            {formMessage && (
              <div className="box pad-x-20 text-center border-box w-100">
                <p className="font-size-14 font-weg-600" style={{ color: 'var(--danger-color)' }}>
                  {formMessage}
                </p>
              </div>
            )}
            <div className="box dsp-flex justify-center mrgn-t-10 pad-20 w-100 border-box">
              <Button type="submit" style="fill" color="second" width={'250px'}>
                Save
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export const FormMenus = ({ menuData }) => {
  const popupForm = useSelector((state) => state.popupForm.data)
  const reCollectMenus = useFindingMenus({ menuData, type: popupForm.formGroupMenus.action })
  const { checked, setChecked, checkedAll, setCheckedAll, totalChecked, resetCollectCheckboxs } =
    useCollectChecked(reCollectMenus)
  const [formMessage, setFormMessage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const formData = popupForm.formGroupMenus.formData
  const dispatch = useDispatch()
  const closeForm = () => {
    setFormMessage(false)
    resetCollectCheckboxs()
    dispatch(closeFormGroupMenus())
  }
  const updateMenus = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    const collectInput = () => {
      const newCollect = {
        data: []
      }
      for (let x = 0; x < e.target.length; x++) {
        const element = e.target[x]
        if (element.id.length > 0) {
          newCollect.data = { ...newCollect.data, [element.id]: element }
        }
      }
      return newCollect.data
    }

    const validate = async (formdata) => {
      const newCollect = {
        menus: []
      }
      const entries = await Object.entries(formdata).map((data) => {
        if (data[0] === 'checkAll') return [data[0], '']
        if (data[1].checked === false) return [data[0], '']
        return [data[0], data[1].value]
      })

      if (entries.find((entry) => entry[0] === false)) return false

      entries.map((entry) => {
        if (entry[1] === '') return
        newCollect.menus.push(entry[1])
      })

      if (newCollect.menus.length === 0) {
        setFormMessage('Nothing to add, please select at least one!')
        return false
      }
      return newCollect
    }

    const validateForm = await validate(collectInput())
    if (!validateForm) return setIsLoading(false)
    try {
      await updateMenusInGroupByID(formData.uuid, popupForm.formGroupMenus.action, validateForm)
      await writeActivity(`${me} made changes to the menus in the "${formData.groupName}" menu group`)
      setIsLoading(false)
      dispatch(addGroupChanges())
      dispatch(addActivityChanges())
      closeForm()
    } catch (error) {
      if (!error.response) {
        dispatch(
          setAlert({
            title: 'New Menu',
            description: 'No Server Response :(, Try again later.',
            alertType: 'message',
            alertStyle: 'danger'
          })
        )
        setIsLoading(false)
        setFormMessage('No Server Response')
        return
      } else if (error?.response?.data?.message) {
        setIsLoading(false)
        setFormMessage(error?.response?.data?.message)
      } else {
        setIsLoading(false)
        setFormMessage('Oopss..! Something when wrong :(')
      }
      setIsLoading(false)
    }
  }
  const styleImg = { width: '60px', height: '60px', objectFit: 'cover', objectPosition: 'center', borderRadius: '50%' }
  const checkedAllArray = (state) => {
    const newChecks = [...checked]
    for (let x = 0; x < checked.length; x++) {
      newChecks[x] = state
    }
    return newChecks
  }
  const selectAllCheckbox = (state, setState) => {
    if (!checked) return
    if (checkedAll === 2) {
      setCheckedAll(true)
      setChecked(checkedAllArray(true))
      setState(true)
    } else if (checkedAll === true) {
      setCheckedAll(false)
      setChecked(checkedAllArray(false))
      setState(false)
    } else {
      setCheckedAll(true)
      setChecked(checkedAllArray(true))
      setState(true)
    }
  }
  const childCheckbox = (index) => {
    setChecked((prevstate) => {
      const newState = [...prevstate]
      newState[index] = !prevstate[index]
      return newState
    })
  }
  const infoMenus = {
    total: `${menuData.length} ${menuData.length > 1 ? 'menus' : 'menu'} `,
    added: `${formData?.menus?.length} ${formData?.menus?.length > 1 ? 'menus' : 'menu'} added to this group`,
    selected: `${totalChecked} ${totalChecked > 1 ? 'menus' : 'menu'}`
  }
  return (
    <div className="popupform" style={{ display: !popupForm.formGroupMenus.status && 'none' }}>
      {popupForm.formGroupMenus.status && (
        <div className="formcard" style={{ overflow: 'hidden' }}>
          {isLoading ? (
            <>
              <DefaultSpinner />
            </>
          ) : null}
          <form
            action=""
            method="post"
            className="formcard"
            style={{ display: !popupForm.formGroupMenus.status && 'none' }}
            onSubmit={updateMenus}
          >
            <span className="close icons8-regular delete" onClick={closeForm}></span>
            <div className="box dsp-flex justify-center pad-t-20 pad-x-20 border-box w-100">
              <h2 className="font-size-24 font-weg-600 accent-col-1">
                {popupForm.formGroupMenus.action === 'add' ? 'Add Menu to Group' : 'Delete Menus from Group'}
              </h2>
            </div>
            <div className="box dsp-flex fl-colm gap-6 pad-20 pad-t-20 pad-x-20">
              <p className="font-size-14 font-weg-600 disabled-text-1">Total: {infoMenus.total}</p>
              <p className="font-size-14 font-weg-600 disabled-text-1">Added: {infoMenus.added}</p>
              <p className="font-size-14 font-weg-700">Selected: {infoMenus.selected}</p>
            </div>
            {reCollectMenus.length > 0 ? (
              <>
                <AdminPanelUI2.Table
                  tHead={[
                    {
                      label: (
                        <InputCheckbox
                          id={'checkAll'}
                          name={'checkall'}
                          value={'checkAll'}
                          isChecked={checkedAll}
                          callbackState={selectAllCheckbox}
                        />
                      ),
                      width: '50px'
                    },
                    { label: 'Image', width: '80px' },
                    { label: 'Name' },
                    { label: 'Price' }
                  ]}
                  moreClass={'w-100 pad-b-10 pad-x-20'}
                  style={{ maxHeight: '800px' }}
                >
                  {reCollectMenus &&
                    reCollectMenus.map((menu, index) => (
                      <AdminPanelUI2.TRow
                        key={`${menu.uuid}${index}`}
                        tRow={[
                          {
                            label: (
                              <InputCheckbox
                                id={`check${index + 1}`}
                                name={`check${index + 1}`}
                                value={menu.uuid}
                                isChecked={checked[index]}
                                callbackState={() => childCheckbox(index)}
                              />
                            )
                          },
                          {
                            label: (
                              <LazyLoadImage
                                effect="opacity"
                                src={menu?.image && getImage(menu.image, 'nofoodphoto')}
                                placeholderSrc="/img/nofoodphoto.jpg"
                                style={styleImg}
                                alt={menu.name}
                              />
                            )
                          },
                          { label: menu.name },
                          {
                            label: `Rp ${menu.price.toLocaleString('id-ID', { currency: 'IDR' })}`,
                            style: { whiteSpace: 'nowrap' }
                          }
                        ]}
                        style={{ '--delay-show': `${0.04 * index}s` }}
                      />
                    ))}
                </AdminPanelUI2.Table>
              </>
            ) : (
              <div
                className="box dsp-flex justify-center align-itms-center fl-colm gap-6 pad-20 pad-t-20 pad-x-20 w-100 border-box"
                style={{ height: '200px' }}
              >
                <span
                  className="icons8-regular search-more"
                  style={{ filter: 'var(--icon1)', '--i8-ratio': '64px' }}
                ></span>
                <p className="font-size-16 font-weg-600 disabled-text-1">
                  {popupForm.formGroupMenus.action === 'add'
                    ? 'There is no menu to add.'
                    : 'There is no menu to remove.'}
                </p>
              </div>
            )}
            {formMessage && (
              <div className="box pad-x-20 text-center border-box w-100">
                <p className="font-size-14 font-weg-600" style={{ color: 'var(--danger-color)' }}>
                  {formMessage}
                </p>
              </div>
            )}
            {popupForm.formGroupMenus.action === 'add' ? (
              <div className="box dsp-flex justify-center mrgn-t-10 pad-20 w-100 border-box">
                <Button
                  type="submit"
                  style="fill"
                  color="second"
                  width={'250px'}
                  moreClass={`${totalChecked === 0 ? ' pointer-none disabled' : ''}`}
                >
                  Add to Group
                </Button>
              </div>
            ) : (
              <>
                <div className="box dsp-flex justify-between mrgn-t-10 pad-20 w-100 border-box">
                  <Button
                    type="button"
                    icon={'delete'}
                    iconStyle="regular gradient"
                    iconColor={'var(--danger-color)'}
                    color="danger"
                    style={'regular'}
                    onClick={closeForm}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    style="fill"
                    color="danger"
                    moreClass={`${totalChecked === 0 ? ' pointer-none disabled' : ''}`}
                  >
                    Remove from this Group
                  </Button>
                </div>
              </>
            )}
          </form>
        </div>
      )}
    </div>
  )
}
