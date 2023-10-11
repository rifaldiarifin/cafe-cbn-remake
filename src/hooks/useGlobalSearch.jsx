import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useGlobalSearch = (pathPage) => {
  const navigate = useNavigate()
  const globalSearch = [
    {
      name: 'Default',
      icon: 'dashboard-layout',
      allowedPath: ['/admin', '/manager'],
      action: () => navigate(`${pathPage}/dashboard/default`, { replace: true })
    },
    {
      name: 'Users',
      icon: 'user',
      allowedPath: ['/admin'],
      action: () => navigate(`${pathPage}/manage/users`, { replace: true })
    },
    {
      name: 'Menu',
      icon: 'cookbook',
      allowedPath: ['/admin', '/manager'],
      action: () => navigate(`${pathPage}/manage/menu`, { replace: true })
    },
    {
      name: 'Transaction',
      icon: 'purchase-order',
      allowedPath: ['/admin', '/manager'],
      action: () => navigate(`${pathPage}/manage/transaction`, { replace: true })
    },
    {
      name: 'Activity',
      icon: 'activity-feed',
      allowedPath: ['/admin', '/manager'],
      action: () => navigate(`${pathPage}/pages/activity`, { replace: true })
    },
    {
      name: 'Blog',
      icon: 'blog',
      allowedPath: ['/admin', '/manager'],
      action: () => navigate(`${pathPage}/pages/blog`, { replace: true })
    },
    {
      name: 'Ad Banner',
      icon: 'ad-banner',
      allowedPath: ['/admin', '/manager'],
      action: () => navigate(`${pathPage}/pages/adbanner`, { replace: true })
    },
    {
      name: 'Settings',
      icon: 'settings',
      allowedPath: ['/admin', '/manager'],
      action: () => navigate(`${pathPage}/pages/settings`, { replace: true })
    }
  ]
  const [searchResult, setSearchResult] = useState([])
  const [searchInput, setSearchInput] = useState('')

  const handleGlobalSearch = async (e) => {
    const value = e.target.value
    setSearchInput(value)

    const result = globalSearch.filter((curr) => {
      return curr.name.toLowerCase().includes(value.toLowerCase())
    })
    if (result.length > 1)
      result.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1
        }
        return 0
      })
    setSearchResult(result)
  }
  return { handleGlobalSearch, searchInput, searchResult }
}

export default useGlobalSearch
