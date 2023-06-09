import type { Meta, StoryObj } from '@storybook/react';
import GenericTable from './GenericTable';



const objectFields = [
  { pos:1, nombre: 'Antonio', edad: '30', dni: '23332332A' },
  { pos:2, nombre: 'Pepe', edad: '20', dni: '23332333B' },
  { pos:3, nombre: 'Juan', edad: '40', dni: '23332334C' },   
]

const handleButtonDeleteClick = () => {
  const message='Has pulsado el boton Delete'
  alert(message)
}

// const handleButtonUpdateClick = (item: Record<string, any>) => {
const handleButtonUpdateClick = () => {
  const message='Has pulsado el boton Update'
  return alert(message)
}

const renderLineButtons = () => {
  return ('prueba'
    // <div className="inline-flex">
    //   <button 
    //     className="bg-gray-300 hover:bg-red-400 text-red-800 font-bold py-2 px-4 rounded-l"
    //     onClick={handleButtonDeleteClick}>Del</button>
    //   <button
    //     className="bg-gray-300 hover:bg-sky-400 text-sky-800 font-bold py-2 px-4 rounded-r" 
    //     onClick={handleButtonUpdateClick}>Upd</button>
    // </div>
  )
}
  
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

