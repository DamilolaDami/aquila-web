import React from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import Lottie from 'lottie-react'
import siginAnimation from '../animations/animation_lki5w8te.json'
import { Google as GoogleIcon, Email as EmailIcon } from '@mui/icons-material'
import { Auth } from '../services/auth_service'
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  setDoc,
  doc
} from 'firebase/firestore'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material'
import { auth, googleProvider, firestore } from '../config/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth'

const SignupDialog = ({ open, onClose }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const signIn = async () => {
    try {
      var user = await createUserWithEmailAndPassword(auth, email, password)
      //createUserWithEmailAndPassword(auth, email, password);
      console.log(user)
    } catch (err) {
      console.error(err)
    }
  }
  const signInWithGoogle = async () => {
    try {
      var user = await signInWithPopup(auth, googleProvider)
      const userCollection = collection(firestore, 'users'); // Reference to the "users" collection
      const userDocRef = doc(userCollection, user.user.uid); // Reference to the specific document within "users" collection using the user's UID
      
      await setDoc(userDocRef, {
        email: user.user.email,
        uid: user.user.uid,
        displayName: user.user.displayName,
        photoURL: user.user.photoURL,
        lastSeen: new Date()
      });
     onClose()
    } catch (err) {
      console.error(err)
    }
  }
  const logOut = async () => {
    try {
      await signOut(auth)
    } catch (err) {
      console.error(err)
    }
  }
  const buttonStyles = {
    margin: '10px',
    padding: '10px 20px',
    fontWeight: 'bold',
    fontSize: '16px',
    textTransform: 'none'
  }

  const googleButtonStyles = {
    ...buttonStyles,
    backgroundColor: '#DB4437',
    color: 'white'
  }

  const emailButtonStyles = {
    ...buttonStyles,
    backgroundColor: '#4285F4',
    color: 'white'
  }
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <div className='sign_up_dialog'>
        <Lottie
          animationData={siginAnimation}
          loop={true}
          style={{ width: '40%' }}
        />
        <h1>Sign In</h1>
        <p>Sign in to your account to continue</p>
        <div
          className='sign_up_dialog__buttons'
          style={{ display: 'flex', justifyContent: 'space-between' }}
        >
          <Button
            onClick={signInWithGoogle}
            variant='contained'
            style={googleButtonStyles}
            startIcon={<GoogleIcon />}
          >
            Sign In with Google
          </Button>
        </div>
      </div>
    </Dialog>
  )
}

export default SignupDialog
