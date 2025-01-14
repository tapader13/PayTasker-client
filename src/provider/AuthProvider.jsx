import { createContext, useEffect, useState } from 'react';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { auth } from './../firebase/firebase.init';
export const context = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const signUpUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  const logoutUser = () => {
    return signOut(auth);
  };
  const updateProfileUser = (data) => {
    return updateProfile(auth.currentUser, data);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      console.log(usr, 'user');
      if (usr) {
        axiosPublic.post('/jwt', { email: usr?.email }).then((data) => {
          // console.log(data, 4);
          if (data?.data?.token) {
            localStorage.setItem('access_token', data?.data?.token);
            setLoading(false);
          }
        });
      } else {
        localStorage.removeItem('access_token');
        setLoading(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <context.Provider
      value={{
        user,
        setUser,
        loading,
        signUpUser,
        loginUser,
        logoutUser,
        updateProfileUser,
        signInWithGoogle,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default AuthProvider;
