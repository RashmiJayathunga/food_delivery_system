import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyByMm_ALtY_lcV6BbDKwVXWMSzjV3wzLCs",
  authDomain: "food-delivery-ae153.firebaseapp.com",
  projectId: "food-delivery-ae153",
  storageBucket: "food-delivery-ae153.firebasestorage.app",
  messagingSenderId: "351270629412",
  appId: "1:351270629412:web:9dbad34880c865907aa8b1",
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
googleProvider.addScope('profile');
googleProvider.addScope('email');