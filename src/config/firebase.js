import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBdgjVsR7q2op_gwliYE-2G3cSxDKi6UgQ',
  authDomain: 'cafecbnupload.firebaseapp.com',
  projectId: 'cafecbnupload',
  storageBucket: 'cafecbnupload.appspot.com',
  messagingSenderId: '830436683203',
  appId: '1:830436683203:web:bc028866aa5f2f56ec6176'
}

const app = initializeApp(firebaseConfig)
export const imageDB = getStorage(app)
