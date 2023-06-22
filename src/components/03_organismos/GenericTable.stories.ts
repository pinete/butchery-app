import type { Meta, StoryObj } from '@storybook/react';
import GenericTable from './GenericTable';
import parse from 'html-react-parser';// Para traducir a React un string con html

const objectFields = [
  { pos:1, nombre: 'Antonio', edad: '30', dni: '23332332A' },
  { pos:2, nombre: 'Pepe', edad: '20', dni: '23332333B' },
  { pos:3, nombre: 'Juan', edad: '40', dni: '23332334C' },   
]

// const handleOnDelClick = () => {alert('has pulsado el boton Del');}
// const handleOnUpdClick = () => {alert('has pulsado el boton Upd');}

const renderLineButtons = () => {
  const textHtml = parse(`
    <div className="inline-flex">
      <button className="bg-gray-300 hover:bg-red-400 text-red-800 font-bold py-2 px-4 rounded-l">Del</button>
      <button className="bg-gray-300 hover:bg-sky-400 text-sky-800 font-bold py-2 px-4 rounded-r">Upd</button>
    </div>`)
  return textHtml
};
  
const meta = {
  title: 'Prueba/GenericTable',
  component: GenericTable,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    data: objectFields,
  },
} satisfies Meta<typeof GenericTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Table: Story = {
  args: {
    data: objectFields,
    renderLineButtons: renderLineButtons
  } 
}

