import React, { useContext } from 'react'
import { SiFirebase } from 'react-icons/si'
import { AppContext } from '../App'
import { getAuth, signOut } from "firebase/auth";
import { toast } from 'react-hot-toast';

export const Header = () => {
  const { setRoute, setUser, user } = useContext(AppContext)
  const auth = getAuth();

  const hazLogOut = () =>{
    signOut(auth).then(() => {
      // Sign-out successful.
      setRoute('login');
      toast(`El LogOut se ha realizado correctamente`)
      setUser(null);
      

    }).catch((error) => {
      // An error happened.
      console.error(error)
    });
  }

  return (
    <header className='h-20 w-full bg-gray-100 shadow-lg flex items-center justify-between px-8 fixed top-0'>
        <div className='flex items-center gap-2 cursor-pointer' onClick={()=> setRoute('home')}>
          <SiFirebase className='text-2xl text-pink-600'/>
          <span className='text-xl text-pink-600 font-semibold'>
            FireShopping v.3
          </span>
        </div>
        <div className='flex gap-2 py-1 px-3'>
          {user ? (
            <>
              <button
                id='btnLogout'
                className='bg-sky-500 text-white py-1 px-3 rounded-full hover:bg-sky-700 transition' 
                onClick={hazLogOut}
            >
                  Logout
              </button>
            </>
          ) : (
            <>
              <button 
                id='btnLogin'
                className='bg-sky-500 text-white py-1 px-3 rounded-full hover:bg-sky-700 transition' 
                onClick={()=>setRoute('login')}
              >
                Login
              </button>
              <button 
                id='btnRegistrese'
                className='bg-sky-500 text-white py-1 px-3 rounded-full hover:bg-sky-700 transition'
                onClick={()=>setRoute('register')}
              >
                ... ó regístrese
              </button>
            </>
          )}

        </div>
      </header>
  )
}
