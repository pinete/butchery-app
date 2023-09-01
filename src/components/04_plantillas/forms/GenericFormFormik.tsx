import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import UploadImage from '../../../firebase/UploadImage';
import DownloadImage from '../../../firebase/DownloadImage';
import ModalComponent from '../dialog/ModalComponent';
import {buttonClass, inputClass, areaClass} from '../../04_plantillas/forms/FormCollect'

// Ver resto de tipos en types.d.ts

interface ObjectData {
  [key: string]: any;
}

type FormProps = {
  modal: boolean;
  openForm:boolean,
  setOpenForm:React.Dispatch<React.SetStateAction<boolean>>
  btnModalIcon: string,
  withOpenBtn: boolean,
  formItem: ObjectData;
  setFormItem: React.Dispatch<React.SetStateAction<{}>>,
  collect: string;
  title: string | undefined;
  fields: FieldForm[]; // Cantidad y Tipo de inputs en el formulario
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

const GenericFormFormik = (
 
  { modal,
    openForm,
    setOpenForm,
    btnModalIcon = 'Pencil',
    withOpenBtn,
    formItem,
    setFormItem,
    collect,
    title = 'Titulo',
    fields, 
    classForm = '', 
    onSubmit, 
    textSubmitButton,
    onClick 
  }: FormProps) => {
  
  console.log('Ha entrado en GenericFormFormik con formItem = ', formItem)

  if ('img' in formItem) image = JSON.parse(JSON.stringify(formItem.img))
  const [imageName, setImageName] = useState<string>(image)
  const [openImage, setOpenImage] = useState<boolean>(false)
  
  useEffect(() => {
    if ('img' in formItem) {
      const newItem = {...formItem};
      newItem['img'] = imageName
      setFormItem(newItem);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageName])

  // Caso especial del tipo de campo select
  const handleSelect = (index:number, field:FieldForm):JSX.Element => { 
    let data=[{}]
    if (field.options !== undefined) data = field.options

    return (
      <>
        <Field 
          as='select' 
          key={`select${index}`} 
          id={`${field.key}${index}`}
          name={field.key}
          className = {`${inputClass} ml-2`}
        >
          { 
            data.map((item:typeof data[0], i:number) => { 
              let id:string = ''
              let textSelect:string = ''
              if (item && 'id' in item)  id = JSON.parse(JSON.stringify(item['id']));
              if (item && 'nombre' in item)  textSelect = JSON.parse(JSON.stringify(item['nombre']));
                                
              return (
                id !== '' && 
                textSelect !== '' && (
                  <option
                    key={`option${field.key}-${index}-${i}`}
                    className = {inputClass}
                    value={id}           
                  > 
                    {textSelect}
                  </option> 
                )
              ) 
            })
          } 
        </Field>
      </>
    ); 
  }

  // Seleccion de tipo de campo a mostrar en el formulario
  const ShowField = ({field, index}:ShowFieldType) => {
    switch (field.type) {
      case 'hidden' :
        return (
          <Field as='hidden'
            key={`${field.key}${index}`}
            id={`${field.key}${index}`}
            name={field.key}
            className = {`${inputClass} ml-2`}
          /> 
        )
      case 'textArea': 
        return (
          <Field as='textarea'
            key={`textArea${index}`}
            id={`${field.key}${index}`}
            name={field.key}
            className = {`${areaClass} ml-2`}
          /> 
        )
      
      case 'imageFile': 
        return (
          <div className='flex'>
            <Field
              key={field.key}
              type='hidden'
              id={`${field.key}${index}`}
              name={field.key}
              value={imageName}
              readOnly={field.readOnly}
              className = {`${inputClass} ml-2`}

            />
            { <DownloadImage 
                ruta = {`image/${collect}`} 
                storageImgName = {imageName ? imageName : ''} 
                imgWidth = {'30%'}
              />
            }
            {<ModalComponent

              openForm = {openImage}
              setOpenForm = {()=>setOpenImage(!openImage)}
              title='Imagen'
              buttonProps={
                {
                  textColorHover: 'white',
                  bg: 'sky-400',
                  bgHover: 'sky-600',
                  bgDark: 'sky-600',
                  bgHoverDark: 'sky-800',
                  icon: 'Search'
                }
              }
              children={<UploadImage ruta={`image/${collect}`} setImageName={setImageName}/>}
            />}
          </div>
        )

      case 'select': return handleSelect (index, field)
      
      default: return (
        <Field
          key={field.key}
          type={field.type}
          id={`${field.key}${index}`}
          name={field.key}
          readOnly={field.readOnly}
          className ={`${inputClass} ml-2`}
        />
      )
    }
  }

  // Generacion de formulario genérico
  const showForm = (
    <Form 
      className={classForm} 
      autoComplete="off"
    >

      {fields.map((field, index) =>{ 
        return (
          <div key={`divGTWF${index}`} className='flex mt-2'>
            <label className='text-xl'
              key = {`label${index}`} 
              htmlFor={`${field.key}${index}`}
            >
              {field.label}: 
            </label>
            <ShowField field = {field} index = {index} /> 
          </div> 
        )
      })}
      <button type="submit" className={`${buttonClass}`}>{textSubmitButton}</button>
    </Form>
  )

  return (
      <Formik
        initialValues={formItem}
        onSubmit={values => {
          if (onSubmit) onSubmit(values)
        }}
      >
        {modal ?
          <ModalComponent 
            openForm = {openForm}
            setOpenForm = {setOpenForm}
            title={title} 
            withOpenBtn={withOpenBtn}
            buttonProps= {{
              textColorHover: 'white',
              bg: 'sky-400',
              bgHover: 'sky-600',
              bgDark: 'sky-600',
              bgHoverDark: 'sky-800',
              icon: `${btnModalIcon}`
            }}
            modalOpen={true}
            children={showForm}
          />
        : showForm }
          

      </Formik>

  );
};

export default GenericFormFormik;