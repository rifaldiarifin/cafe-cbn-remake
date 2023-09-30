import { useEffect, useState } from 'react'

const InputCircleImage = ({ src = undefined, name = 'image', id, size }) => {
  const [file, setFile] = useState(false)
  const [preview, setPreview] = useState(false)
  const changeProfile = (e) => {
    if (!e.target.files && !e.target.files.length > 0) return
    if (e.target.value.length > 0) {
      setFile(e.target.files)
    }
  }

  useEffect(() => {
    if (!file) return
    let tmp = []
    tmp.push(URL.createObjectURL(file[0]))
    const objectUrl = tmp
    setPreview(objectUrl)
    for (let x = 0; x < objectUrl.length; x++) {
      return () => URL.revokeObjectURL(objectUrl[x])
    }
  }, [file])

  return (
    <label htmlFor={id} className="input-circle-image" style={{ width: size, height: size }}>
      <img
        src={preview ? preview[0] : src ? src : '/img/nofoodphoto.jpg'}
        className="auto-scale-image"
        alt={(file && file[0]?.name) || 'Input Image'}
      />
      <span className="icons8-regular full-image"></span>
      <input type="file" accept="image/png, image/jpg, image/jpeg" onChange={changeProfile} id={id} name={name} />
    </label>
  )
}

export default InputCircleImage
