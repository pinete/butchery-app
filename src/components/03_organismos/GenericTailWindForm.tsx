import React, { useState } from 'react';
import MotionButton from '../01_atomos/MotionButton';
import UploadImage from '../utils/UploadImage';
import DownloadImage from '../utils/DownloadImage';
import ModalComponent from '../04_plantillas/dialog/ModalComponent';



type FormProps<T> = {
  // Ver resto de tipos en types.d.ts
  //data?: T; // Objeto de la coleccion
  //fieldsToShow?: string[]; //Campos a mostrar de la coleccion( deben coincidir con el nro de fields)
  formList?: any;
  fields: FieldForm[]; // Cantidad y Tipo de inputs en el formulario
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
function GenericTailWindForm<T>(
  { //data,
    formList,
    fields, 
    //fieldsToShow,
    buttonProps,
    inputProps, 
    areaProps, 
    classForm='', 
    onSubmit, 
    onClick 
  }: FormProps<T>) {

  // const labelClass =
  // `
  //   pointer-events-none 
  //   absolute 
  //   left-3 
  //   top-0 
  //   mb-0 
  //   max-w-[90%] 
  //   origin-[0_0] 
  //   truncate pt-[0.37rem] 
  //   leading-[1.6] 
  //   text-neutral-500 
  //   transition-all 
  //   duration-200 
  //   ease-out 
  //   peer-focus:-translate-y-[0.9rem] 
  //   peer-focus:scale-[0.8] 
  //   peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] 
  //   peer-data-[te-input-state-active]:scale-[0.8] 
  //   motion-reduce:transition-none dark:text-neutral-200 
  //   dark:peer-focus:text-primary
  // `
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

  const ShowField = (field:FieldForm, index:number):JSX.Element => {
    const [imageName, setImageName] = useState<string>(formList.value[0][field.key])
    switch (field.type) {
      case 'textArea': return (
        <textarea
          key={`textArea${index}`}
          id={`${field.key}${index}`}
          name={`${field.key}${index}`}
          //value={formList ? formList.value[0][field.key] : ''}
          value={imageName}
          rows={areaProps?.rows}
          cols={areaProps?.cols}
          placeholder = {areaProps?.placeHolder}
          className = {areaClass}
          onChange={handleChange}
        /> 
      )
      case 'imageFile':{ 
        return (
          <div className='flex'>
            <input
              key={`fileImg${index}`}
              //type='hidden'
              type='text'
              id={`${field.key}${index}`}
              name={`${field.key}${index}`}
              readOnly={field.readOnly}
              //value={formList ? formList.value[0][field.key] : ''}
              value={imageName}
              placeholder={inputProps?.placeHolder}
              className ={inputClass}
              onChange={handleChange}
            />
            {DownloadImage ('image', formList ? formList.value[0][field.key] : '', '30%')}
            <span key ='ModalFormFam'>
                {ModalComponent (
                  {
                    title:'Imagen', 
                    buttonProps:{
                      textColorHover: 'white',
                      bg: 'sky-400',
                      bgHover: 'sky-600',
                      bgDark: 'sky-600',
                      bgHoverDark: 'sky-800',
                      icon: 'Search'}, 
                    children:UploadImage ('image', setImageName)
                  }
                )}
              </span>
            
          </div>
        )
      }

      default: return (
        <input
          key={`input${index}`}
          type={field.type}
          id={`${field.key}${index}`}
          name={`${field.key}${index}`}
          readOnly={field.readOnly}
          //value={formList.value[0][fieldsToShow![index]] || ''}
          value={formList ? formList.value[0][field.key] : ''}
          placeholder={inputProps?.placeHolder}
          className ={inputClass}
          onChange={handleChange}
        />
      )
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className={classForm}>
      {fields.map((field, index) =>{ 
        
        return (
          <div key={`divGTWF${index}`}>
            <label 
              key = {`label${index}`} 
              htmlFor={`${field.key}${index}`}
            >
              {field.label}
            </label>
            
            {/* <label
              key={`label${index}`}
              htmlFor={`${field.key}${index}`}
              className={labelClass}
            > {fieldsToShow ? fieldsToShow[index] : `label${index}`}
            </label> */}

            {ShowField (field, index )}
          </div>
        )
      })}
      {onClick && <MotionButton  key = 'btnOnclick' onclick={onClick} textButton={buttonProps?.textButton} />}
      <button key = 'btnSubmit' type="submit" className={buttonClass}>{buttonProps?.textButton}</button>
    </form>
  );
}
export default GenericTailWindForm