import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const useFindingMenus = ({ menuData, type = 'add' }) => {
  const [reCollect, setReCollect] = useState(false)
  const formData = useSelector((state) => state.popupForm.data.formGroupMenus.formData)
  useEffect(() => {
    const findMenu = () => {
      const reCollect = [...menuData]
      for (let x = 0; x < formData.menus.length; x++) {
        const findI = reCollect.findIndex((find) => find.uuid === formData.menus[x].uuid)
        if (findI !== -1) {
          reCollect.splice(findI, 1)
        }
      }
      return reCollect
    }
    if (menuData && formData.menus) {
      if (type === 'remove') return setReCollect(formData.menus)
      setReCollect(findMenu())
    }
  }, [formData.menus, menuData, type])
  return reCollect
}

export default useFindingMenus
