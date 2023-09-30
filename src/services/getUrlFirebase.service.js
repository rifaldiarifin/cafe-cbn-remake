import { getDownloadURL, ref } from 'firebase/storage'
import { imageDB } from '../config/firebase'

const getUrlFirebase = async (path) => {
  return await getDownloadURL(ref(imageDB, path))
}

export default getUrlFirebase
