import { useState } from 'react'
import './App.css'
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import app from './firebase.config';


function App() {
  const googleAuth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState();
  //google sign in
  const handleGoogleSignIn = () => {
    signInWithPopup(googleAuth, googleProvider)
      .then(result => {
        const loggedUser = result.user;
        setUser(loggedUser);
      })
      .catch(error => {
        console.log("error", error.message);
      })
  }
  // googleSignOut
  const handleGoogleSignOut = () => {
    signOut(googleAuth)
      .then(() => {
        console.log("Logged Out")
        setUser()
      })
      .catch(error => {
        console.log(error.message);
      })

  }

  return (
    <>
      <h2>{
        user ? `Hello, ${user.displayName.split(" ")[0]}` : "Hello, buddy"
      }</h2>

      {/* user ? sign out : sign In */}
      {
        user ? <button onClick={handleGoogleSignOut}>Sign Out</button> :
          <button onClick={handleGoogleSignIn}>Google SignIn</button>
      }


    </>
  )
}

export default App
