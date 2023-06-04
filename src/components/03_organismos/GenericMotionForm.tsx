import React, { useState } from 'react';
import MotionButton from '../01_atomos/MotionButton';

// Definimos los tipos necesarios
type Field = {
  key: string;
  type: string;
  isArea: boolean;
};

type FormProps<T> = {
  // Ver resto de tipos en types.d.ts
  fields: Field[];
  buttonProps?: MotionButtonProps,
  inputProps?: MotionInputProps,
  areaProps?: MotionTextAreaProps,
  classForm?: string,
  onSubmit?: (data: T) => void;
  onClick?: () => void;
};

type FormData = {
  [key: string]: string;
};

// Componente del formulario genérico
export function GenericMotionForm<T>(
  { 
    fields, 
    buttonProps={
      textButton:'Aceptar',
      textColorHover:'white',
      bg:'sky-300',
      bgHover:'sky-400',
      bgDark:'sky-600',
      bgHoverDark:'sky-800',
      adjunctClass:'',
      icon:undefined,
      // onsubmit?: (data:T)=>void
      onclick:()=>{}
    }, 
    inputProps, 
    areaProps, 
    classForm='', 
    onSubmit, 
    onClick 
  }: FormProps<T>) {

  const inputClass = 
  `
    inputTailWind 
    bg-${inputProps?.bg} 
    hover:bg-${inputProps?.bgHover} 
    dark:bg-${inputProps?.bgDark} 
    dark:hover:bg-${inputProps?.bgHoverDark}  
    dark:text-${inputProps?.textColorHover}-200 
    dark:placeholder:text-${inputProps?.textColorHover}-300 
    ${inputProps?.adjunctClass}
  `
  const areaClass = 
  `
    inputTailWind 
    bg-${areaProps?.bg} 
    hover:bg-${areaProps?.bgHover} 
    dark:bg-${areaProps?.bgDark} 
    dark:hover:bg-${areaProps?.bgHoverDark}  
    dark:text-${areaProps?.textColorHover}-200 
    dark:placeholder:text-${areaProps?.textColorHover}-300 
    ${areaProps?.adjunctClass}
  `
  const buttonClass = 
  `
    inputTailWind 
    bg-${buttonProps?.bg} 
    hover:bg-${buttonProps?.bgHover} 
    dark:bg-${buttonProps?.bgDark} 
    dark:hover:bg-${buttonProps?.bgHoverDark}  
    dark:text-${buttonProps?.textColorHover}-200 
    dark:placeholder:text-${buttonProps?.textColorHover}-300 
    ${buttonProps?.adjunctClass}
  `
  const [formData, setFormData] = useState<FormData>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData as T);
  };


  return (
    <form onSubmit={handleSubmit} className={classForm}>
      {fields.map((field) => (
        <div key={field.key}>
          <label htmlFor={field.key}>{field.key}</label>
          {field.isArea ? (
            <textarea
              id={field.key}
              name={field.key}
              value={formData[field.key] || ''}
              rows={areaProps?.rows}
              cols={areaProps?.cols}
              placeholder = {areaProps?.placeHolder}
              className = {areaClass}
              onChange={handleChange}
            />
          ) : (
            
            <input
              type={field.type}
              id={field.key}
              name={field.key}
              value={formData[field.key] || ''}
              placeholder={inputProps?.placeHolder}
              className ={inputClass}
              onChange={handleChange}
            />

          )}
        </div>
      ))}
      {/* <MotionButton  onclick={()=>alert('Pulsado boton MotionButton')} textButton={buttonProps?.textButton} /> */}
      <MotionButton  onclick={onClick} textButton={buttonProps?.textButton} />
      <button type="submit" className={buttonClass}>{buttonProps?.textButton}</button>
    </form>
  );
  
}
