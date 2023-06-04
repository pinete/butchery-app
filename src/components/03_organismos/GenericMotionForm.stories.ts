import type { Meta, StoryObj } from '@storybook/react';
import { GenericMotionForm  } from './GenericMotionForm';

type FormProps = {
  key: string;
  type: string;
  isArea: boolean;
};

type MotionButtonProps = {
  textButton: string | undefined;
  textColorHover?: string | undefined;
  bg?: string | undefined;
  bgHover?: string | undefined;
  bgDark?: string | undefined;
  bgHoverDark?: string | undefined;
  placeholder?:string,
  adjunctClass?: string | undefined;
  //onclick?:()=>void;
}

type MotionInputProps = {
  bg?:string,
  bgHover?:string,
  bgDark?: string, // por ejemplo {'slate-700'}
  bgHoverDark?:string,
  textColorHover?:string,
  placeholder?:string,
  adjunctClass?:string
}

type MotionTextAreaProps = {
  rows?:number | undefined, 
  cols?: number | undefined,
  bg?:string,
  bgHover?:string,
  bgDark?: string, // por ejemplo {'slate-700'}
  bgHoverDark?:string,
  textColorHover?:string,
  placeholder?:string,
  adjunctClass?:string
}

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
const inputProps:MotionInputProps = { 
  bg:'sky-100',
  bgHover:'sky-400',
  bgDark: 'slate-700',
  bgHoverDark:'sky-800',
  textColorHover:'white',
  adjunctClass: '',
  placeholder:'Placeholder de input' 
}
const areaProps:MotionTextAreaProps = { 
  cols:40,
  rows:3,
  bg:'sky-100',
  bgHover:'sky-400',
  bgDark: 'slate-700',
  bgHoverDark:'sky-800',
  textColorHover:'white',
  adjunctClass: '',
  placeholder:'Placeholder de textarea' 
}

const objectFields: FormProps[] = [
    { key: 'FieldText', type: 'text', isArea: false },
    { key: 'FieldNumber', type: 'number', isArea: false },
    { key: 'FieldTextArea', type: 'text', isArea: true },
    { key: 'FieldDate', type: 'date', isArea: false },
    { key: 'FieldDateTime-local', type: 'datetime-local', isArea: false },
    { key: 'FieldCheckBox', type: 'checkbox', isArea: false },
    { key: 'FieldFile', type: 'file', isArea: false },
    { key: 'Fieldimage', type: 'image', isArea: false },
    { key: 'FieldPassword', type: 'password', isArea: false },
    { key: 'FieldRadio', type: 'radio', isArea: false },
    { key: 'FieldRange', type: 'range', isArea: false },
    { key: 'FieldSearch', type: 'search', isArea: false },
    { key: 'FieldTel', type: 'tel', isArea: false },
  ];

const meta = {
  title: 'Prueba/GenericMotionForm',
  component: GenericMotionForm,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    objectFields: objectFields,
    buttonProps
  },
} satisfies Meta<typeof GenericMotionForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Form: Story = {
  args: {
    fields: objectFields,
    buttonProps,
    inputProps,
    areaProps,
    onClick: () => { return alert('Has pulsado el boton. Se ejecuta onClick') },
    // onSubmit: (data) => { return alert(`Has pulsado el boton. Se ejecuta onSubmit. ${data}`) },
    onSubmit: (data) => {  
      const txtValue = JSON.stringify(data)
      return alert(`Has pulsado el boton. Se ejecuta onSubmit. ${txtValue}`) 
    },
  }, 
}
