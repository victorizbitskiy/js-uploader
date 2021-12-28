import { initializeApp } from "firebase/app"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import {upload} from './upload.js'

import { getAuth, getRedirectResult, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAUJFksG9erFiy3pENyBQqj95EwbxgMbkA",
  authDomain: "js-uploader-a58b8.firebaseapp.com",
  projectId: "js-uploader-a58b8",
  storageBucket: "js-uploader-a58b8.appspot.com",
  messagingSenderId: "2516018595",
  appId: "1:2516018595:web:077ba5784f0e051d1c6616"
}

const firebaseApp = initializeApp(firebaseConfig)
const storage = getStorage(firebaseApp)

upload('#file', {
  multi: true,
  accept: ['.png', '.jpg', '.jpeg', '.gif'],
  onUpload(files, blocks) {

    files.forEach((file, index) => {
      const storageRef = ref(storage, `images/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on('state_changed', snapshot => {
        const percentage = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0) + '%'

        const block = blocks[index].querySelector('.preview-info-progress')
        block.textContent = percentage
        block.style.width = percentage
      }, error => {
        console.log(error)
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          console.log('Download URL', url)
        })
      })
    })
  }
})