import { useEffect, useState } from 'react'

const useSearchFilter = (callback, data = [], initInput = '') => {
  const [searchInput, setSearchInput] = useState(initInput)
  const [searchResult, setSearchResult] = useState([])
  useEffect(() => {
    if (data) {
      if (searchInput.length === 0) return setSearchResult([])
      const result = data.filter((curr, index, arr) => callback(searchInput, curr, index, arr))
      setSearchResult(result)
    }
  }, [searchInput])

  return { searchResult, searchInput, setSearchInput }
}

export default useSearchFilter
