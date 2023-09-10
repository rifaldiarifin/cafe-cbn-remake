import { useEffect, useRef, useState } from 'react'

const useNavigationMenu = (navGroup, addFiltering = false) => {
  const [navigationMenu, setNavigationMenu] = useState(false)
  const ref = useRef(false)
  useEffect(() => {
    if (!ref.current && navGroup) {
      const collectNavMenu = () => {
        let collect = []
        for (let x = 0; x < navGroup.length; x++) {
          let subCollect = []
          for (let z = 0; z < navGroup[x].subMenu.length; z++) {
            subCollect.push(false)
          }
          subCollect[0] = true
          collect.push({ title: navGroup[x].menu.title, navMenu: false, subNavMenu: subCollect })
        }
        collect[0].navMenu = true
        return collect
      }
      if (addFiltering) {
        const filtering = {
          menu: {
            title: 'Filtering'
          },
          subMenu: [
            {
              title: 'Hot',
              icon: 'fire',
              data: [...navGroup[0].subMenu[0].data]
            },
            {
              title: 'Discount',
              icon: 'two-hearts',
              data: [...navGroup[0].subMenu[0].data, ...navGroup[1].subMenu[0].data]
            },
            {
              title: 'Expensive',
              icon: 'up',
              data: [...navGroup[0].subMenu[1].data, ...navGroup[1].subMenu[0].data]
            },
            {
              title: 'Cheapest',
              icon: 'down',
              data: [...navGroup[1].subMenu[2].data, ...navGroup[1].subMenu[3].data]
            }
          ]
        }
        navGroup.unshift(filtering)
      }
      setNavigationMenu(collectNavMenu())
      return () => (ref.current = true)
    }
  }, [addFiltering, navGroup, navigationMenu])
  return { navigationMenu, setNavigationMenu }
}

export default useNavigationMenu
