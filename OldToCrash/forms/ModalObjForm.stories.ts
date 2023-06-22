import type { Meta, StoryObj } from '@storybook/react';
import ModalObjForm  from '../forms/ModalObjForm';

// Tipo para cada uno de los inputs-textarea de los formularios genéricos

// Ejemplo de formulario de familias con inputs nombre e imagen
const fields: FieldForm[] = [
  { key: 'nombre', type: 'text', label:'Familia', isArea: false},// nombre
  { key: 'img', type: 'text', label:'Imagen', readOnly: true, isArea: false},// imagen
];
const buttonProps:MotionButtonProps = { 
  textButton:'Aceptar',
  textColorHover:'white',
  bg:'sky-300',
  bgHover:'sky-400',
  bgDark:'sky-600',
  bgHoverDark:'sky-800',
  adjunctClass:'',
  // onsubmit?: (data:T)=>void
  //onclick:()=>{}
}
const meta = {
  title: 'Prueba/ModalObjForm',
  component: ModalObjForm,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    objectFields: fields,
    buttonProps
  },
} satisfies Meta<typeof ModalObjForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Form: Story = {
  args: {
    objectFields:fields,
    collect:'families', 
    textButton:'Guardar',
    title:'Familias', 
    arrayFields:['nombre', 'img'],
    //renderHeadButtons?:()=>React.ReactNode,
    //renderLineButtons?:()=>React.ReactNode,
    onClick: () => { return alert('Has pulsado el boton. Se ejecuta onClick') },
    //onSubmit: (data) => { return alert(`Has pulsado el boton. Se ejecuta onSubmit. ${data}`) },
    onSubmit: (data:any) => {  
      const txtValue = JSON.stringify(data)
      return alert(`Has pulsado el boton. Se ejecuta onSubmit. ${txtValue}`) 
    },
  }, 
}
