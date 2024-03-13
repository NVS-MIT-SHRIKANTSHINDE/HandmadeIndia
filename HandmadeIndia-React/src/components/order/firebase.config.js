import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbtLWhsCyowcgXcDednv-Q9ktNYXwI4ow",
  authDomain: "otpverification-62fb1.firebaseapp.com",
  projectId: "otpverification-62fb1",
  storageBucket: "otpverification-62fb1.appspot.com",
  messagingSenderId: "406796612202",
  appId: "1:406796612202:web:7fa37eeed5f524f4be5013"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);