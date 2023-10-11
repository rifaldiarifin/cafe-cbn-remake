import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setHighlight, switchHighlight } from '../redux/slice/landingHighlightNavSlice'

const useHighlightNavScrolling = (pageRef, customNavPost) => {
  const dispatch = useDispatch()
  const [elementPost, setElementPost] = useState(false)
  const ref = useRef(false)
  const ref2 = useRef(false)
  useEffect(() => {
    if (!ref.current && pageRef) {
      const checkMatch = (id) => {
        return customNavPost.find((find) => find.to.replace('#', '') === id)
      }
      const collectNavPost = () => {
        const post1 = []
        const post2 = []
        for (let x = 0; x < pageRef.current?.children.length; x++) {
          const element = pageRef.current?.children[x]
          if (post2.length === 0) {
            post1.push(pageRef.current)
            post2.push({ id: pageRef.current.id, isActive: true })
          } else if (element.id.length > 0 && customNavPost && checkMatch(element.id)) {
            post1.push(element)
            post2.push({ id: element.id, isActive: false })
          } else if (element.id.length > 0 && !customNavPost) {
            post1.push(element)
            post2.push({ id: element.id, isActive: false })
          }
        }
        setElementPost(post1)
        dispatch(setHighlight(post2))
      }
      collectNavPost()
      return () => (ref.current = true)
    }
  }, [customNavPost, dispatch, pageRef])
  useEffect(() => {
    if (!ref2.current && elementPost) {
      const handleScroll = () => {
        for (let x = 0; x < elementPost.length; x++) {
          if (scrollY + window.screen.height === elementPost[0].clientHeight) {
            dispatch(switchHighlight(x))
          } else if (window.scrollY + 50 >= elementPost[x].offsetTop - 150) {
            dispatch(switchHighlight(x))
          }
        }
      }
      document.addEventListener('scroll', handleScroll)
      return () => {
        ref2.current = true
        document.removeEventListener('scroll', handleScroll)
      }
    }
  }, [dispatch, elementPost])
}

export default useHighlightNavScrolling
