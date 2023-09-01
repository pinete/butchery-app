import React, { useEffect, useState } from 'react';
import UploadImage from '../../firebase/UploadImage';
import DownloadImage from '../../firebase/DownloadImage';
import ModalComponent from '../04_plantillas/dialog/ModalComponent';
import {buttonClass, inputClass, areaClass} from '../04_plantillas/forms/FormCollect'

// Ver resto de tipos en types.d.ts

interface ObjectData {
  [key: string]: any;
}

type FormProps = {
  openForm:boolean,
  setOpenForm:React.Dispatch<React.SetStateAction<boolean>>
  formItem: ObjectData;
  setFormItem: React.Dispatch<React.SetStateAction<{}>>,
  collect: string;
  modal: boolean;
  title: string | undefined;
  fields: FieldForm[]; // Cantidad y Tipo de inputs en el formulario
  //buttonClass?: string,
  //inputClass?: string,
  //areaClass?: string,
  classForm?: string,
  textSubmitButton:string, 
  onSubmit?: (row: {}) => void;
  onClick?: (row: {}) => void;
};

type ShowFieldType = {
  field:FieldForm; 
  index:number
}
let image = ''
// Componente del formulario genérico
function GenericForm (
  
  { formItem,
    setFormItem,
    openForm,
    setOpenForm,
    collect,
    modal,
    title = 'Titulo',
    fields, 
    //buttonClass,
    //inputClass, 
    //areaClass, 
    classForm='', 
    onSubmit, 
    textSubmitButton,
    onClick 
  }: FormProps) {

  console.log('Ha entrado en GenericForm')

  if ('img' in formItem) image = formItem.img
  const [imageName, setImageName] = useState<string>(image)
  
  //console.log('formItem al iniciar GenericForm: ',formItem)

  useEffect(() => {
    if ('img' in formItem) {
      const newItem = {...formItem};
      newItem['img'] = imageName
      setFormItem(newItem);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageName])

  // const handleChange = (event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, fieldImg?:FieldForm | undefined) => {
  //   const { name, value } = event.target;
  //   setFormItem(prevState => ({...prevState, [name]: value }));
  // };
  
  //const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, fieldImg?:FieldForm | undefined) => { 
  
  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {   
    let { name, value } = e.target; 
    const newItem = {...formItem};
    newItem[name] = value
    setFormItem(newItem);
  },[formItem, setFormItem]);

  const handleSubmit = React.useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log('entró en handleSubmit' )
    if (onSubmit) onSubmit(formItem); // Se establece la condicion por ser onSubmit una propiedad opcional
    console.log('formItem on submit: ',formItem)
  },[formItem, onSubmit]);

  const handleSelect = React.useCallback((index:number, field:FieldForm):JSX.Element => { 
    let data=[{}]
    if (field.options !== undefined) data = field.options

    
    return (
      <>
        <select data-te-select-init 
          key={`select${index}`} 
          id={`${field.key}${index}`}
          name={`${field.key}`}
          value = {formItem[field.key]}
          className = {`${inputClass} ml-2`}
          onChange={(e)=>handleChange(e)}
        >
          { 
            data.map((item:typeof data[0], i:number) => { 
              let id:string = ''
              let textSelect:string = ''
              if ('id' in item)  id = JSON.parse(JSON.stringify(item['id']));
              if ('nombre' in item)  textSelect = JSON.parse(JSON.stringify(item['nombre']));
                                
              return (
                id !== '' && 
                textSelect !== '' && (
                  <option
                    key={`option${field.key}-${index}-${i}`}
                    value={id}
                    //placeholder = {areaProps?.placeHolder}
                    className = {inputClass}           
                  > 
                    {textSelect}
                  </option> 
                )
              ) 
            })
          } 
        </select>
      </>
    ); 
  },[formItem, handleChange]);

  const ShowField = ({field, index}:ShowFieldType) => {
    switch (field.type) {
      case 'textArea': 
        return (
          <textarea
            key={`textArea${index}`}
            id={`${field.key}${index}`}
            name={`${field.key}`}
            value={formItem[field.key]}
            // rows={areaProps?.rows}
            // cols={areaProps?.cols}
            // placeholder = {areaProps?.placeHolder}
            className = {`${areaClass} ml-2`}
            onChange={(e)=> handleChange(e)}
          /> 
        )
      
      case 'imageFile': 
        return (
          <div className='flex'>
            <input
              //key={`imgFile${index}`}
              key={field.key}
              type='hidden'
              //type='text'
              id={`${field.key}${index}`}
              name={`${field.key}`}
              readOnly={field.readOnly}
              value={imageName}
              //placeholder={inputProps?.placeHolder}
              className = {`${inputClass} ml-2`}
              // onChange={(e)=>handleChange(e, field)}
              onChange={(e)=>handleChange(e)}
            />
            { <DownloadImage 
                ruta = {`image/${collect}`} 
                storageImgName = {imageName ? imageName : ''} 
                imgWidth = {'30%'}
              />
            }
            {<ModalComponent
              openForm = {openForm}
              setOpenForm = {setOpenForm}
              title='Imagen'
              buttonProps={{
                textColorHover: 'white',
                bg: 'sky-400',
                bgHover: 'sky-600',
                bgDark: 'sky-600',
                bgHoverDark: 'sky-800',
                icon: 'Search'}}
              children={<UploadImage ruta={`image/${collect}`} setImageName={setImageName}/>}
            />}
          </div>
        )

      case 'select': return handleSelect (index, field)
      
      default: return (
        <input
          //key={`input${index}`}
          key={field.key}
          type={field.type}
          id={`${field.key}${index}`}
          name={field.key}
          readOnly={field.readOnly}
          value={formItem[field.key]}
          //placeholder={inputProps?.placeHolder}
          className ={`${inputClass} ml-2`}
          onChange={(e)=>handleChange(e)}
        />
      )
    }
  }

  const showForm = (
      <form 
        onSubmit={(e)=>handleSubmit(e)} 
       
        className={classForm} 
        autoComplete="off"
      >
      {fields.map((field, index) =>{ 
        return (
          <div key={`divGTWF${index}`} className='flex mt-2'>
            <label data-te-select-label-ref className='text-xl'
              key = {`label${index}`} 
              htmlFor={`${field.key}${index}`}
            >
              {field.label}: 
            </label>
            <ShowField field = {field} index = {index} /> 
          </div>
        
        )
      })}
      {/* {onClick && <MotionButton  key = 'btnOnclick' onClick={onClick(row)} textButton={buttonProps?.textButton} />}  */}
      {onSubmit && <button key = 'btnSubmit' type="submit" className={`${buttonClass} mt-5`}>{textSubmitButton}</button>}
    </form>
  )
  
  return (
    <>
    {modal ?  
      <ModalComponent 
            openForm = {openForm}
            setOpenForm = {setOpenForm}
            title={title} 
            buttonProps= {{
              textColorHover: 'white',
              bg: 'sky-400',
              bgHover: 'sky-600',
              bgDark: 'sky-600',
              bgHoverDark: 'sky-800',
              icon: 'Pencil'
            }}
            modalOpen={true}
            children={showForm}
      />
      : 
        showForm
    } 
    </>
  );
}
export default GenericForm