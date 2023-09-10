import { imageDB } from '../../config/firebase'
import { ref, uploadBytes } from 'firebase/storage'
import { useDispatch, useSelector } from 'react-redux'
import { closeFormMenu, closeFormUser } from '../../redux/slice/popupForm'
import { v4 as uuidv4 } from 'uuid'
import Button from '../Elements/Button'
import InputField from '../Elements/InputField'
import InputCircleImage from '../Elements/InputImageCircle'
import SimpleCombobox from '../Elements/SimpleCombobox'
import SimpleComboLi from '../Elements/SimpleCombobox/SimpleComboLi'
import { useState } from 'react'

export const FormUser = () => {
  const [formMessage, setFormMessage] = useState(false)
  const popupForm = useSelector((state) => state.popupForm.data)
  const dispatch = useDispatch()
  const newAccount = (e) => {
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
    // Validate Function
    const validate = (obj) => {
      const entries = Object.entries(obj).map((data) => {
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
            return [data[0], data[1].files[0] ?? false]

          // validate role
          case 'role':
            return [data[0], data[1].value]

          default:
            // validate other input
            if (!data[1].parentElement.parentElement.classList.contains('inputfield')) return [data[0], false]
            if (data[1].parentElement.parentElement.classList.contains('invalid')) return [data[0], false]
            if (data[1].value === '') {
              InputField.SetMessage('Cannot be empty!', data[1].parentElement.parentElement, true)
              return [data[0], false]
            }
            break
        }

        return [data[0], data[1].value]
      })

      if (entries.find((data) => data[1] === false)) return false

      return entries.reduce((acc, curr) => {
        return { ...acc, [curr[0]]: curr[1] }
      }, [])
    }

    const validateForm = validate(userData)
    if (!validateForm) return

    const splitExtentionFile = validateForm.profileImage.name.split('.')
    const imgName = `${uuidv4()}.${splitExtentionFile[splitExtentionFile.length - 1]}`
    const imgRef = ref(imageDB, `img/avatars/${imgName}`)
    uploadBytes(imgRef, validateForm.profileImage)
    // uploadtask.then(res => {
    //     getDownloadURL(ref(imageDB, `img/avatars/${imgName}`)).then(res2 => console.log(res2))
    // })
  }

  const closeForm = () => {
    dispatch(closeFormUser())
    setFormMessage(false)
  }
  // useEffect(() => {
  //     getDownloadURL(imgRef)
  // }, [imgRef])
  return (
    <div className="popupform" style={{ display: !popupForm.status && 'none' }}>
      {popupForm.status && (
        <form
          action=""
          method="post"
          className="formcard"
          style={{ display: !popupForm.formUser.status && 'none' }}
          onSubmit={newAccount}
        >
          <span className="close icons8-regular delete" onClick={closeForm}></span>
          <div className="box dsp-flex justify-center pad-t-20 pad-x-20 border-box w-100">
            <h2 className="font-size-24 font-weg-600 accent-col-1">New Account</h2>
          </div>
          <div className="box dsp-flex justify-center pad-10 pad-x-20 pad-t-20 border-box w-100">
            <InputCircleImage id="profileimage" name="profileimage" />
          </div>
          <div className="box dsp-flex fl-colm justify-start w-100 border-box align-itms-start gap-10 pad-10 pad-x-20">
            <div className="box dsp-flex align-itms-center gap-10 w-100">
              <InputField
                type="text"
                label="First Name"
                id="firstname"
                value={popupForm.formUser.action === 'update' ? popupForm.formUser.formData.firstname : ''}
                name="firstname"
                placeHolder="First Name"
                width="100%"
                required
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
                required
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
                width="100%"
                required
                autoComplete="off"
              />
              <div className="box">
                <p className="font-main font-weg-600 space-08 mrgn-b-6" style={{ fontSize: '15px' }}>
                  Role
                </p>
                <SimpleCombobox
                  id="role"
                  name="role"
                  select={popupForm.formUser.action === 'update' ? popupForm.formUser.formData.access.role : 'Regular'}
                  styleBox="fill"
                  fullRadius
                >
                  <SimpleComboLi value="Regular" />
                  <SimpleComboLi value="Manager" />
                  <SimpleComboLi value="Machine" />
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
              required
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
              required
              autoComplete="off"
            />
            <InputField
              type="password"
              label="Password"
              id="password"
              value={popupForm.formUser.action === 'update' ? popupForm.formUser.formData.password : ''}
              name="password"
              placeHolder="Password"
              width="100%"
              required
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
          <div className="box dsp-flex justify-center mrgn-t-10 pad-10 w-100 border-box">
            <Button type="submit" style="fill" color="second" moreClass="w-100">
              Save
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

export const FormMenu = () => {
  const popupForm = useSelector((state) => state.popupForm.data)
  const formdata = popupForm.formMenu.formData
  const dispatch = useDispatch()
  const newMenu = (e) => {
    e.preventDefault()
    console.log(e)
  }
  // const updateCategory = (e) => {

  // }
  // const updateSubCategory = (e) => {

  // }
  // const updateMenu = (e) => {

  // }
  switch (popupForm.formMenu.action) {
    case 'updatecategory':
      return (
        <div className="popupform" style={{ display: !popupForm.status && 'none' }}>
          {popupForm.status && (
            <form
              action=""
              method="post"
              className="formcard"
              style={{ display: !popupForm.formMenu.status && 'none' }}
              onSubmit={newMenu}
            >
              <span className="close icons8-regular delete" onClick={() => dispatch(closeFormMenu())}></span>
              <div className="box dsp-flex justify-center pad-t-20 pad-x-20 border-box w-100">
                <h2 className="font-size-24 font-weg-600 accent-col-1">Menu</h2>
              </div>
              <div className="box dsp-flex fl-colm justify-start w-100 border-box align-itms-start gap-10 pad-10 pad-x-20">
                <div className="box dsp-flex align-itms-center gap-10 w-100">
                  <div className="box dsp-flex fl-colm gap-10 w-100">
                    <InputCircleImage
                      src={`/img/menu_images${formdata.menuType.category.image}`}
                      size="60px"
                      id="categoryimage"
                      name="categoryimage"
                    />
                    <InputField
                      type="text"
                      name="category"
                      id="category"
                      label="Category"
                      value={formdata.menuType.category.title}
                      placeHolder="Category Name"
                      width="100%"
                    />
                  </div>
                </div>
              </div>
              <div className="box dsp-flex justify-center mrgn-t-10 pad-10 w-100 border-box">
                <Button type="submit" style="fill" color="second" moreClass="w-100">
                  Save
                </Button>
              </div>
            </form>
          )}
        </div>
      )
    case 'updatesubcategory':
      return (
        <div className="popupform" style={{ display: !popupForm.status && 'none' }}>
          {popupForm.status && (
            <form
              action=""
              method="post"
              className="formcard"
              style={{ display: !popupForm.formMenu.status && 'none' }}
              onSubmit={newMenu}
            >
              <span className="close icons8-regular delete" onClick={() => dispatch(closeFormMenu())}></span>
              <div className="box dsp-flex justify-center pad-t-20 pad-x-20 border-box w-100">
                <h2 className="font-size-24 font-weg-600 accent-col-1">Menu</h2>
              </div>
              <div className="box dsp-flex fl-colm justify-start w-100 border-box align-itms-start gap-10 pad-10 pad-x-20">
                <div className="box dsp-flex align-itms-center gap-10 w-100">
                  <div className="box dsp-flex fl-colm gap-10 w-100">
                    <InputCircleImage
                      src={`/img/menu_images${formdata.menuType.subCategory.image}`}
                      size="60px"
                      id="subcategoryimage"
                      name="subcategoryimage"
                    />
                    <InputField
                      type="text"
                      label="Sub Category"
                      id="subcategory"
                      name="subcategory"
                      value={formdata.menuType.subCategory.title}
                      placeHolder="Sub Category Name"
                      width="100%"
                    />
                  </div>
                </div>
              </div>
              <div className="box dsp-flex justify-center mrgn-t-10 pad-10 w-100 border-box">
                <Button type="submit" style="fill" color="second" moreClass="w-100">
                  Save
                </Button>
              </div>
            </form>
          )}
        </div>
      )
    case 'updatemenu':
      return (
        <div className="popupform" style={{ display: !popupForm.status && 'none' }}>
          {popupForm.status && (
            <form
              action=""
              method="post"
              className="formcard"
              style={{ display: !popupForm.formMenu.status && 'none' }}
              onSubmit={newMenu}
            >
              <span className="close icons8-regular delete" onClick={() => dispatch(closeFormMenu())}></span>
              <input type="hidden" defaultValue={formdata.image} name="uuid" />
              <div className="box dsp-flex justify-center pad-t-20 pad-x-20 border-box w-100">
                <h2 className="font-size-24 font-weg-600 accent-col-1">Menu</h2>
              </div>
              <div className="box dsp-flex fl-colm justify-start w-100 border-box align-itms-start gap-10 pad-10 pad-t-20 pad-x-20">
                <div className="box dsp-flex w-100 border-box justify-between gap-30">
                  <InputCircleImage
                    src={`/img/menu_images${formdata.image}`}
                    size="80px"
                    id="menuimage"
                    name="menuimage"
                  />
                  <div className="dsp-flex fl-colm justify-start fl-1 border-box align-itms-start gap-10">
                    <InputField
                      type="text"
                      label="Menu Name"
                      value={formdata.name}
                      placeHolder="My Coffee"
                      width="100%"
                    />
                    <InputField
                      type="currencyIDR"
                      label="Price"
                      value={formdata.price}
                      placeHolder="1000"
                      width="100%"
                    />
                  </div>
                </div>
                <InputField
                  type="text"
                  label="Contents"
                  value={formdata.contents}
                  placeHolder="Foam / Milk / etc."
                  width="100%"
                />
              </div>
              <div className="box dsp-flex justify-center mrgn-t-10 pad-10 w-100 border-box">
                <Button type="submit" style="fill" color="second" moreClass="w-100">
                  Save
                </Button>
              </div>
            </form>
          )}
        </div>
      )

    default:
      return (
        <div className="popupform" style={{ display: !popupForm.status && 'none' }}>
          {popupForm.status && (
            <form
              action=""
              method="post"
              className="formcard"
              style={{ display: !popupForm.formMenu.status && 'none' }}
              onSubmit={newMenu}
            >
              <span className="close icons8-regular delete" onClick={() => dispatch(closeFormMenu())}></span>
              <div className="box dsp-flex justify-center pad-t-20 pad-x-20 border-box w-100">
                <h2 className="font-size-24 font-weg-600 accent-col-1">Menu</h2>
              </div>
              {popupForm.formMenu.action === 'menu' || (
                <div className="box dsp-flex fl-colm justify-start w-100 border-box align-itms-start gap-10 pad-10 pad-x-20">
                  <div className="box dsp-flex align-itms-center gap-10 w-100">
                    {popupForm.formMenu.action === 'category' && (
                      <>
                        <div className="box dsp-flex fl-colm gap-10 w-100">
                          <InputCircleImage size="60px" id="categoryimage" name="categoryimage" />
                          <InputField type="text" label="Category" placeHolder="Category Name" width="100%" />
                        </div>
                        <span
                          className="icons8-filled forward"
                          style={{ filter: 'var(--icon1)', '--i8-ratio': '14px', transform: 'translateY(50px)' }}
                        ></span>
                      </>
                    )}
                    {(popupForm.formMenu.action === 'subcategory') | (popupForm.formMenu.action === 'category') && (
                      <div className="box dsp-flex fl-colm gap-10 w-100">
                        <InputCircleImage size="60px" id="subcategoryimage" name="subcategoryimage" />
                        <InputField type="text" label="Sub Category" placeHolder="Sub Category Name" width="100%" />
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div
                className="box dsp-flex fl-colm justify-start w-100 border-box align-itms-start gap-10 pad-10 pad-t-20 pad-x-20"
                style={popupForm.formMenu.action !== 'menu' ? { borderTop: '1px solid var(--separator)' } : null}
              >
                <div className="box dsp-flex w-100 border-box justify-between gap-30">
                  <InputCircleImage size="80px" id="menuimage" name="menuimage" />
                  <div className="dsp-flex fl-colm justify-start fl-1 border-box align-itms-start gap-10">
                    <InputField type="text" label="Menu Name" placeHolder="My Coffee" width="100%" />
                    <InputField type="currencyIDR" label="Price" placeHolder="1000" width="100%" />
                  </div>
                </div>
                <InputField type="text" label="Contents" placeHolder="Foam / Milk / etc." width="100%" />
              </div>
              <div className="box dsp-flex justify-center mrgn-t-10 pad-10 w-100 border-box">
                <Button type="submit" style="fill" color="second" moreClass="w-100">
                  Save
                </Button>
              </div>
            </form>
          )}
        </div>
      )
  }
}
