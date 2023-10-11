import axios from 'axios'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useDocumentClickTarget, useDocumentTitle } from '../hooks/useDocumentHandler'
import { setAlert } from '../redux/slice/popupScreenSlice'
import DualForm from '../components/Layout/DualForm'
import InputField from '../components/Elements/InputField'
import Button from '../components/Elements/Button'
import SimpleNav from '../components/Fragments/SimpleNav'
import SimpleNavLi from '../components/Elements/SimpleNav/SimpleNavLi'
import { setIsLoading, setAuth } from '../redux/slice/authSlice'
import jwtDecode from 'jwt-decode'
import useAuth from '../hooks/useAuth'
import { me, writeActivity } from '../utils/activity'
import CONFIG from '../config/environment'

const SignInPage = () => {
  useDocumentClickTarget()
  useDocumentTitle('SignIn')
  useAuth()

  const [formMessage, setFormMessage] = useState(false)
  const dispatch = useDispatch()

  const signInHandler = async (e) => {
    // prevent default
    e.preventDefault()
    // loading white process
    dispatch(setIsLoading(true))

    const value = {
      username: e.target.username,
      password: e.target.password
    }

    // Function Validate
    const validate = (data) => {
      const entries = Object.entries(data).map((input) => {
        const inputField = input[1].parentElement.parentElement
        if (!inputField.classList.contains('inputfield')) return [input[0], false]
        if (input[1].value === '') {
          InputField.SetMessage(`Please enter your ${input[0]}!`, inputField, true)
          return [input[0], false]
        }
        return [input[0], input[1].value]
      })

      if (entries.find((input) => input[1] === false)) return false

      return entries.reduce((acc, curr) => {
        return { ...acc, [curr[0]]: curr[1] }
      }, {})
    }

    // Validate input
    const validateForm = validate(value)
    if (!validateForm) {
      dispatch(setIsLoading(false))
      return false
    }

    // Request to api
    try {
      const response = await axios.post('/auth/login', JSON.stringify(validateForm), {
        baseURL: CONFIG.BaseUrlAPI,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      })
      setFormMessage('')
      const accessToken = response?.data?.result.accessToken
      localStorage.setItem('access_token', accessToken)

      const accessDecode = jwtDecode(accessToken)

      await writeActivity(`${me} signed in on device`)
      // clear
      dispatch(setAuth({ userSession: accessDecode, isSignin: true }))
      dispatch(setIsLoading(false))
    } catch (error) {
      if (!error.response) {
        setFormMessage('No Server Response :(')
        dispatch(
          setAlert({
            title: 'Sign In',
            description: 'No Server Response :(, Try again later.',
            alertType: 'message',
            alertStyle: 'danger'
          })
        )
      } else if (error.response.data) {
        setFormMessage(error.response.data.message)
      } else {
        setFormMessage('Oopss!, something when wrong :(')
        dispatch(
          setAlert({
            title: 'Sign In',
            description: 'Oopss!, something when wrong :(',
            alertType: 'message',
            alertStyle: 'danger'
          })
        )
      }
      dispatch(setIsLoading(false))
    }
  }
  return (
    <DualForm
      content={
        <>
          <h1>WELCOME BACK!</h1>
          <p className="mrgn-t-10 mrgn-b-40">
            Don&apos;t have a account,{' '}
            <Link to={'/auth/register'} className="hyperlink">
              Sign Up
            </Link>
          </p>
          <form action="" method="post" className="w-100" onSubmit={signInHandler}>
            <InputField
              type="text"
              label="Username"
              style="regular"
              name="username"
              id="username"
              placeHolder="Username"
              autoComplete="off"
              moreClass="w-100 mrgn-b-20"
              required
              autoFocus
            />
            <InputField
              type="password"
              label="Password"
              style="regular"
              name="password"
              id="password"
              placeHolder="Password"
              autoComplete="off"
              moreClass="w-100"
              required
            />
            <div className="box w-100 txt-right mrgn-y-20">
              <Link to={'/auth/forgetpassword'} className="hyperlink">
                Forget Password?
              </Link>
            </div>
            {formMessage && (
              <div className="box pad-x-20 text-center border-box w-100">
                <p className="font-size-14 font-weg-600" style={{ color: 'var(--danger-color)' }}>
                  {formMessage}
                </p>
              </div>
            )}
            <Button type="submit" style="fill" color="default" id="signin" moreClass="mrgn-t-20">
              Sign In
            </Button>
          </form>
        </>
      }
      banner={
        <>
          <SimpleNav>
            <SimpleNavLi>
              <Link to={'/'} className="btn icon">
                <span className="icons8-filled home" style={{ filter: 'brightness(99)' }}></span>
              </Link>
            </SimpleNavLi>
          </SimpleNav>
          <img src="/img/paintedbrowncoffeecup.png" className="illustration" alt="paintedbrowncoffeecup" />
        </>
      }
    />
  )
}

export default SignInPage
