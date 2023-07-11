import React, { useState } from 'react';
import MotionButton from '../01_atomos/MotionButton';
import UploadImage from '../../firebase/UploadImage';
import DownloadImage from '../../firebase/DownloadImage';
import ModalComponent from '../04_plantillas/dialog/ModalComponent';
import useList from '../../hooks/useList';
import { getSimplifiedObjects } from '../../firebase/ObjController';



type FormProps<T> = {
  // Ver resto de tipos en types.d.ts
  //data?: T; // Objeto de la coleccion
  collectSelect?: string[]; // Array de colecciones necesarias para los select
  formList?: any;
  fields: FieldForm[]; // Cantidad y Tipo de inputs en el formulario
  buttonProps?: MotionButtonProps,
  inputProps?: MotionInputProps,
  areaProps?: MotionTextAreaProps,
  classForm?: string,
  onSubmit?: (data: T) => void;
  onClick?: () => void;
};

// Componente del formulario genérico
function GenericTailWindForm<T>(
  { //data,
    collectSelect=[''],
    formList,
    fields, 
    buttonProps,
    inputProps, 
    areaProps, 
    classForm='', 
    onSubmit, 
    onClick 
  }: FormProps<T>) {

  let contSelect = -1 // Incrementaremos el contador para cada select (por si existe en formList)

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
  //const [formData, setFormData] = useState<FormData>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> , index:number) => { 
    const { name, value } = e.target;
    formList.updateField(0, name, value)
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //if (onSubmit) onSubmit(formData as T);
    console.log('formList.value[0]: ',formList.value[0])
    if (onSubmit) onSubmit(formList.value[0] as T);
  };

  const HandleSelect= (index:number, label:string):JSX.Element => {
    contSelect ++;
    const collect = collectSelect[contSelect]
    const selectList = useList(async () => await getSimplifiedObjects(collect))
    return (
      <>
        <select data-te-select-init key={`select${index}`} onChange={(e)=>handleChange(e, index)}>
          {selectList.value.map((item, i) => { 
            return (
              <option
                key={`option${index}-${i}`}
                value={item.id}
                placeholder = {areaProps?.placeHolder}
                className = {inputClass}           
              > 
                {item.name}
              </option> )
          })} 
        </select>
        <label data-te-select-label-ref>{label}</label>
      </>
    ); 
  }

  

  const ShowField = (field:FieldForm, index:number):JSX.Element => {
    const [imageName, setImageName] = useState<string>(formList.value[0][field.key])
    switch (field.type) {
      case 'textArea': 
        return (
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
            onChange={(e)=>handleChange(e, index)}
          /> 
        )
      
      case 'imageFile': 
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
              onChange={(e)=>handleChange(e, index)}
            />
            {/* {formList.value[0][field.key] && DownloadImage ('image', formList ? formList.value[0][field.key] : '', '30%')} */}
            {DownloadImage ('image/families', imageName ? imageName : '', '30%')}
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
      
      case 'select': return HandleSelect (index, field.label)
      
      default: return (
        <input
          key={`input${index}`}
          type={field.type}
          id={`${field.key}${index}`}
          name={`${field.key}`}
          readOnly={field.readOnly}
          //value={formList.value[0][fieldsToShow![index]] || ''}
          value={formList ? formList.value[0][field.key] : ''}
          //value={formData[0]}
          placeholder={inputProps?.placeHolder}
          className ={inputClass}
          onChange={(e)=>handleChange(e,index)}
        />
      )
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className={classForm} autoComplete="off">
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
            > {field.label}
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