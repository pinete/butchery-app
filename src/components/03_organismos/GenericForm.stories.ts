import type { Meta, StoryObj } from '@storybook/react';
import { GenericForm } from './GenericForm';

type FormProps = {
  key: string;
  type: string;
  isInput:boolean;
};

type MotionButtonProps = {
  textButton: string | undefined;
  textColorHover?: string | undefined;
  bg?: string | undefined;
  bgHover?: string | undefined;
  bgDark?: string | undefined;
  bgHoverDark?: string | undefined;
  adjunctClass?: string | undefined;
}
const buttonProps:MotionButtonProps = { textButton:'Texto Boton' }

const objectFields: FormProps[] = [
    { key: 'FieldText', type: 'text', isInput: true },
    { key: 'FieldNumber', type: 'number', isInput: true },
    { key: 'FieldTextArea', type: 'text', isInput: false },
    { key: 'FieldDate', type: 'date', isInput: true },
    { key: 'FieldDateTime-local', type: 'datetime-local', isInput: true },
    { key: 'FieldCheckBox', type: 'checkbox', isInput: true },
    { key: 'FieldFile', type: 'file', isInput: true },
    { key: 'Fieldimage', type: 'image', isInput: true },
    { key: 'FieldPassword', type: 'password', isInput: true },
    { key: 'FieldRadio', type: 'radio', isInput: true },
    { key: 'FieldRange', type: 'range', isInput: true },
    { key: 'FieldSearch', type: 'search', isInput: true },
    { key: 'FieldTel', type: 'tel', isInput: true },
  ];

const meta = {
  title: 'Prueba/GenericForm',
  component: GenericForm,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    objectFields: objectFields,
    buttonProps
  },
} satisfies Meta<typeof GenericForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Form: Story = {
  args: {
    fields: objectFields,
    onSubmit: () => { return alert('Has pulsado el boton. Se ejecuta OnSubmit') }
  }, 
}
