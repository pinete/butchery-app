import MotionButton from '../01_atomos/MotionButton';
import IcoBurger from '../01_atomos/IcoBurger';
import logo from '../../images/logo_carniceria_alboran.png'
import ModalLogin from '../04_plantillas/dialog/ModalLogin';
//import ModalLogin from '../04_plantillas/dialog/ModalLogin';

type User = {
  name: string;
};

interface HeaderProps {
  user?: User;
  onLogout: () => React.JSX.Element | void;
}

export const Header = ({ user, onLogout }: HeaderProps) => (
  <header className='fixed'>
    <div className="h-20 w-full bg-gray-100 shadow-lg flex items-center justify-between px-8 fixed top-0">
      <div className='container flex  items-center'>
        <IcoBurger/>
        <img src={logo} className='w-[70px] h-[70px] mx-3'  alt="Logo de la empresa"/>
        <div className='flex '>
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
              onclick={onLogout}/>
          </>
        ) : (
          <>
            <ModalLogin />
          </>
        )}
      </div>
    </div>
  </header>
);
