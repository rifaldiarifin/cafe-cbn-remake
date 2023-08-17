import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setClickTarget } from '../redux/slice/documentSlice'
export const useDocumentTitle = (title) => {
  if (typeof title !== 'string') throw new Error('Title must be a string!')

  useEffect(() => {
    document.title = `${title} - Cafe CBN`
  }, [title])

  return null
}

export const useDocumentClickTarget = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    document.onclick = (e) => {
      dispatch(
        setClickTarget({
          className: e.target.className,
          tagName: e.target.tagName
        })
      )
    }
  }, [dispatch])
}
