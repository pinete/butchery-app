import React from 'react';

import MotionButton from '../01_atomos/MotionButton';
import IcoBurger from '../01_atomos/IcoBurger';
import logo from '../../images/logo_carniceria_alboran.png'
//import './header.css';

type User = {
  name: string;
};

interface HeaderProps {
  user?: User;
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
}

export const Header = ({ user, onLogin, onLogout, onCreateAccount }: HeaderProps) => (
  <header className='fixed'>
    <div className="h-20 w-full bg-gray-100 shadow-lg flex items-center justify-between px-8 fixed top-0">
      <div className='container flex  items-center'>
        <IcoBurger/>
        <img src={logo} className='w-[70px] h-[70px] mx-3'  alt="Logo de la empresa"/>
        <div className='flex '>
          {/* <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
              <path
                d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z"
                fill="#FFF"
              />
              <path
                d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z"
                fill="#555AB9"
              />
              <path
                d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z"
                fill="#91BAF8"
              />
            </g>
          </svg> */}
          <h1 className='text-3xl text-red-700 font-semibold dark:text-sky-300'><p>Carnicería</p>Alborán</h1>
        </div>
      </div>
      <div  className="flex items-center gap-2 cursor-pointer">
        {user ? (
          <>
            <span className='grid text-xs'>
              Welcome, <b>{user.name}</b>
            </span>
            <MotionButton 
              textColorHover='white'
              bg='sky-400'
              bgHover='sky-600'
              bgDark='sky-600'
              bgHoverDark='sky-800'
              textButton='Logout' 
              onclick={()=>onLogout}/>
          </>
        ) : (
          <>
            <MotionButton  
            textColorHover='white'
              bg='red-400'
              bgHover='red-600'
              bgDark='red-600'
              bgHoverDark='red-800'
              textButton='Login' 
              onclick={()=>onLogin} />
            <MotionButton  
              textColorHover='white'
              bg='red-400'
              bgHover='red-600'
              bgDark='red-600'
              bgHoverDark='red-800'
              textButton='Sign up' 
              onclick={()=>onCreateAccount} />
          </>
        )}
      </div>
    </div>
  </header>
);
