import { auth, provider } from '../../config/firebase-config'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate, Navigate } from 'react-router-dom'
import { useGetUserInfo } from '../../hooks/useGetUserInfo'

import './style.scss'

export const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();
  
  const signInWithGoogle = async () => {
    let results;

    try {
      results = await signInWithPopup(auth, provider);
    } catch (err) {
      return;
    }
    
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    }
    localStorage.setItem('auth', JSON.stringify(authInfo));
    navigate('/expense-tracker')
  }

  if (isAuth) {
    return <Navigate to='/expense-tracker' />
  }
  
  return (
    <div className="container">
      <div className="login-page">
        <img className='fade-in-image' src="https://images.unsplash.com/photo-1693833499426-da0853de9fb2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMzV8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
        <p className='fade-in-text'>Sign In With Google<br/> to Continue</p>
        <button className="login-with-google-btn fade-in-text" onClick={signInWithGoogle}>
          Sign In With Google
        </button>
      </div>
    </div>

  )
}