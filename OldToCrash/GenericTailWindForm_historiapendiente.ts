// import type { Meta, StoryObj } from '@storybook/react';
// import GenericTailWindForm from './GenericTailWindForm';
// import useList from '../../hooks/useList';

// type FormProps = {
//   key: string;
//   type: string;
//   readOnly?: boolean;
//   isArea: boolean;
// };

// type MotionButtonProps = {
//   textButton: string | undefined;
//   textColorHover?: string | undefined;
//   bg?: string | undefined;
//   bgHover?: string | undefined;
//   bgDark?: string | undefined;
//   bgHoverDark?: string | undefined;
//   placeholder?:string,
//   adjunctClass?: string | undefined;
//   icon?:string;
//   onclick?:()=>React.JSX.Element | void;
// }

// type MotionInputProps = {
//   bg?:string,
//   bgHover?:string,
//   bgDark?: string, // por ejemplo {'slate-700'}
//   bgHoverDark?:string,
//   textColorHover?:string,
//   placeholder?:string,
//   adjunctClass?:string
// }

// type MotionTextAreaProps = {
//   rows?:number | undefined, 
//   cols?: number | undefined,
//   bg?:string,
//   bgHover?:string,
//   bgDark?: string, // por ejemplo {'slate-700'}
//   bgHoverDark?:string,
//   textColorHover?:string,
//   placeholder?:string,
//   adjunctClass?:string
// }

// const buttonProps:MotionButtonProps = { 
//   textButton:'Aceptar',
//   textColorHover:'white',
//   bg:'sky-300',
//   bgHover:'sky-400',
//   bgDark:'sky-600',
//   bgHoverDark:'sky-800',
//   adjunctClass:'',
//   // onsubmit?: (data:T)=>void
//   //onclick:()=>{}

// }
// const inputProps:MotionInputProps = { 
//   bg:'sky-100',
//   bgHover:'sky-400',
//   bgDark: 'slate-700',
//   bgHoverDark:'sky-800',
//   textColorHover:'white',
//   adjunctClass: '',
//   placeholder:'Placeholder de input' 
// }
// const areaProps:MotionTextAreaProps = { 
//   cols:40,
//   rows:3,
//   bg:'sky-100',
//   bgHover:'sky-400',
//   bgDark: 'slate-700',
//   bgHoverDark:'sky-800',
//   textColorHover:'white',
//   adjunctClass: '',
//   placeholder:'Placeholder de textarea' 
// }

// // Tipo de inputs/textArea que tiene el formulario
// const objectFields: FieldForm[] = [
//   { key: 'FieldText', type: 'text', label:'Campo Texto', isArea: false},
//   { key: 'FieldNumber', type: 'number', label: 'Campo numero', isArea: false },
//   { key: 'FieldTextArea', type: 'textArea', label: 'Campo Text Area',  isArea: true },
//   { key: 'FieldFecha', type: 'date', label: 'Campo Fecha',  isArea: false },
//   { key: 'FieldFechaHora', type: 'datetime-local',  label: 'Campo Fecha Hora', isArea: false },
//   { key: 'FieldCheckBox', type: 'checkbox',  label: 'Campo CheckBox', isArea: false },
//   { key: 'FieldFile', type: 'file',  label: 'Campo File', isArea: false, readOnly: true},
//   { key: 'FieldImage', type: 'image',  label: 'Campo Imagen', isArea: false },
//   { key: 'FieldPassword', type: 'password', label: 'Campo Password', isArea: false },
//   { key: 'FieldRadio', type: 'radio',  label: 'Campo Radio', isArea: false },
//   { key: 'FieldRange', type: 'range',  label: 'Campo Rango', isArea: false },
//   { key: 'FieldSearch', type: 'search',  label: 'Campo Buscar', isArea: false },
//   { key: 'FieldTel', type: 'tel',  label: 'Campo Telefono', isArea: false },
// ];

// //Objeto sobre el que actua el formulario
// const obj = [
//   {
//     FieldText:'Un texto',
//     FieldNumber:2,
//     FieldTextArea:'esto es un texto en un textArea',
//     FieldFecha:new Date('2002-10-12'),
//     FieldFechaHora:new Date('2021-6-23 10:55:16'),
//     FieldCheckBox: true,
//     FieldFile:'WIN_20210529_16_15_25_Scan.jpg',
//     FieldImage:'WIN_20210529_16_15_56_Scan.jpg',
//     FieldPassword:'1234',
//     FieldRadio:true,
//     FieldRange:60,
//     FieldSearch:'texto a buscar',
//     FieldTel: '666555444'
//   }
// ]

// const meta = {
  
//   title: 'Prueba/GenericTailWindForm',
//   component: GenericTailWindForm,
//   // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
//   tags: ['autodocs'],
//   parameters: {
//     // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
//     objectFields: objectFields,
//     buttonProps
//   },
// } satisfies Meta<typeof GenericTailWindForm>;

// export default meta;
// type Story = StoryObj<typeof meta>;

// export const Form: Story = {
  
//   args: {
//     formList,
//     fields: objectFields,
//     buttonProps,
//     inputProps,
//     areaProps,
//     onClick: () => { return alert('Has pulsado el boton. Se ejecuta onClick') },
//     // onSubmit: (data) => { return alert(`Has pulsado el boton. Se ejecuta onSubmit. ${data}`) },
//     onSubmit: (data) => {  
//       const txtValue = JSON.stringify(data)
//       return alert(`Has pulsado el boton. Se ejecuta onSubmit. ${txtValue}`) 
//     },
//   }, 
// }
