import { useEffect, useState } from 'react'

const useCollectChecked = (data) => {
  const [checkedAll, setCheckedAll] = useState(false)
  const [checked, setChecked] = useState(false)

  const checkAll = () => {
    let found = 0
    for (let x = 0; x < checked.length; x++) {
      if (checked[x] === true) {
        found = found + 1
      }
    }
    return found
  }
  const totalChecked = checkAll()
  const resetCollectCheckboxs = () => {
    setCheckedAll(false)
    setChecked(false)
  }
  useEffect(() => {
    if (data) {
      const checkboxs = () => {
        if (totalChecked === 0) {
          setCheckedAll(false)
        } else if (totalChecked < checked.length) {
          setCheckedAll(2)
        } else if (totalChecked === checked.length) {
          setCheckedAll(true)
        }
      }
      checkboxs()
    }
  }, [totalChecked, checked, data])
  useEffect(() => {
    if (data) {
      const dataArray = data.reduce((prev) => [...prev, false], [])
      setChecked(dataArray)
    }
  }, [data])
  return { checked, setChecked, checkedAll, setCheckedAll, totalChecked, resetCollectCheckboxs }
}

export default useCollectChecked
