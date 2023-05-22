//import React from 'react'
import { motion } from 'framer-motion'
import { 
  BsTrash as Trash, 
  BsFillUnlockFill as UnlockFill, 
  BsLockFill as LockFill,
  BsTools as Tools
} from 'react-icons/bs'


/**
 * 
 * @param textButton Texto en el botón
 * @param bg Color e intensidad de fondo. Por omision 'sky-300'
 * @param bgHover Color e intensidad de fondo si puntero sobre botón . Por omision 'sky-400'
 * @param textColorHover Color e intensidad de letra si puntero sobre botón. Por omisión 'white'
 * @param bgDark Color e intensidad de fondo si modo oscuro. Por omisión 'sky-600'
 * @param bgHoverDark Color e intensidad de fondo si puntero sobre botón y modo oscuro. Por omisión 'sky-800'
 * @param adjunctClass Cualquier string a adjuntar a la clase (formato TailWind)
 * @param icon Icono. Admite: Trash, UnlockFill, LockFill, Tools
 * @returns 
 */

const MotionButton = (
  {
    textButton='',
    textColorHover='white',
    bg='sky-300',
    bgHover='sky-400',
    bgDark='sky-600',
    bgHoverDark='sky-800',
    adjunctClass='',
    icon='',
    onclick=()=>{}
  }
) => {
  const btnTailWind = `py-1 px-2 m-1 rounded shadow transition-all duration-200 bg-${bg} hover:text-${textColorHover} hover:bg-${bgHover} dark:bg-${bgDark} dark:hover:bg-${bgHoverDark} ${adjunctClass}`

  const showText = () => {
    switch (icon) {
      case 'Trash': 
        return <Trash className='text-xl' />
      case 'UnlockFill': 
        return <UnlockFill className='text-xl' />
      case 'LockFill': 
        return <LockFill className='text-xl' />
      case 'Tools':
        return <Tools className='text-xl' />
      default:
        break;
    }
  }

  return (
  <>
    <motion.button
      type={'button'}
      title={`Button with text ${textButton} and/or icon ${icon}`}
      whileHover={{ scale:1.1 }}
      whileTap={{ scale: 0.9 }} 
      className={`${btnTailWind}`}
      onClick={ onclick }
    > 
    <p className='flex items-center'>
        {showText()} {textButton}
    </p>
    </motion.button>
  </>
  )
}

export default MotionButton