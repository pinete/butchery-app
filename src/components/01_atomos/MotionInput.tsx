import { motion } from 'framer-motion'


const MotionInput = (
  {
    value='',
    placeholder = 'Introduzca texto',
    textColorHover='white',
    bg='sky-300',
    bgHover='sky-400',
    bgDark='sky-600',
    bgHoverDark='sky-800',
    adjunctClass='',
    onKeyDown = (e:React.KeyboardEvent<HTMLInputElement>)=>{},
    onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{}
  }
) => {

  return (
    <div className="relative mb-3 m-1 z-0" 
      data-te-input-wrapper-init 
      data-te-input-group-ref
    >
      
      <motion.input
        value={value}
        className=
          {`
            inputTailWind
            bg-${bg} 
            hover:bg-${bgHover} 
            dark:bg-${bgDark} 
            dark:hover:bg-${bgHoverDark}  
            dark:text-${textColorHover}-200 
            dark:placeholder:text-${textColorHover}-300 
            ${adjunctClass}
          `}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        onChange={onChange}
      />

      {/* <motion.label
        // htmlFor={id}
        // className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
        // className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.5rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
        className=
        {`
          pointer-events-none 
          absolute 
          left-3 
          top-0 
          mb-0 
          max-w-[90%] 
          origin-[0_0] 
          truncate 
          pt-[0.37rem] 
          leading-[1.6]
          text-neutral-700 
          transition-all 
          duration-200 
          ease-out 
          peer-focus:text-primary 
          peer-focus:-translate-y-[1.5rem] 
          peer-focus:scale-[0.8] 
          peer-data-[te-input-state-active]+label:-translate-y-[1.5rem] 
          peer-data-[te-input-state-active]:scale-[0.8] 
          motion-reduce:transition-none
          dark:text-neutral-200 
          dark:peer-focus:text-primary
        `}
        >{textLabel}
      </motion.label> */}
    </div>
  )
}

export default MotionInput