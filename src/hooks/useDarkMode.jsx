import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDarkMode } from '../redux/slice/darkModeSlice'
import { useNavigate } from 'react-router-dom'

const useDarkMode = () => {
  const darkMode = useSelector((state) => state.darkMode.data)
  const dispacth = useDispatch()
  const navigate = useNavigate()
  const localDarkMode = localStorage.getItem('theme_mode')
  useEffect(() => {
    if (!localDarkMode) {
      localStorage.setItem('theme_mode', 'light')
      dispacth(setDarkMode(false))
    }
    if (darkMode ? 'dark' : 'light' !== localDarkMode) {
      dispacth(setDarkMode(localDarkMode === 'dark' ? true : false))
    }
    darkMode ? document.body.classList.add('dark') : document.body.classList.remove('dark')
  }, [darkMode, dispacth, localDarkMode, navigate])
}

export default useDarkMode
