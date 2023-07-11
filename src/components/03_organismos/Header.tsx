import MotionButton from '../01_atomos/MotionButton';
//import IcoBurger from '../01_atomos/IcoBurger';
// import logo from '../../images/logo_carniceria_alboran.png'
import logo from '../../images/AppImages/windows11/LargeTile.scale-400-removebg.png'
import ModalLogin from '../04_plantillas/dialog/ModalLogin';
import BtnMenuPrinc from '../03_organismos/BtnMenuPrinc'
//import ModalLogin from '../04_plantillas/dialog/ModalLogin';

type User = {
  name: string;
};

interface HeaderProps {
  user?: User;
  onLogout: () => React.JSX.Element | void;
  AnimateSettings?: () => JSX.Element;
}

 const Header = ({ user, onLogout, AnimateSettings }: HeaderProps) => (
  <header className='fixed z-10'>
    <div className="h-20 w-full bg-gray-100 shadow-lg flex items-center justify-between px-8 fixed top-0">
      <div className='container flex items-center'>
        {AnimateSettings && <AnimateSettings/>}
        <span ><BtnMenuPrinc /></span>
        <img src={logo} className='w-[90px] h-[90px] mx-3'  alt="Logo de la empresa"/>
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
export default Header