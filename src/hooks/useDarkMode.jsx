import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDarkMode } from '../redux/slice/darkModeSlice'

const useDarkMode = () => {
  const darkMode = useSelector((state) => state.darkMode.data)
  const dispacth = useDispatch()
  const localDarkMode = localStorage.getItem('darkMode')
  useEffect(() => {
    if (!localDarkMode) {
      localStorage.setItem('darkMode', false)
      dispacth(setDarkMode(false))
    }
    darkMode ? document.body.classList.add('dark') : document.body.classList.remove('dark')
  }, [darkMode, dispacth, localDarkMode])
}

export default useDarkMode
