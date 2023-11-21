import { useState } from 'react'
import './App.css'
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth';
import app from './firebase.config';


function App() {
  // google Auth and google Provider
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState();
  //google sign in
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
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
    signOut(auth)
      .then(() => {
        console.log("Logged Out")
        setUser()
      })
      .catch(error => {
        console.log(error.message);
      })

  }
  // handle github login and logout
  const githubProvider = new GithubAuthProvider();
  const handleGithubSignIn = ()=>{
    signInWithPopup(auth, githubProvider)
    .then(result => {
      const loggedUser = result.user;
      setUser(loggedUser);
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
        <>
          <button onClick={handleGoogleSignIn}>Google SignIn</button>
          <button onClick={handleGithubSignIn}>Github SignIn</button>
        </>
      }


    </>
  )
}

export default App
