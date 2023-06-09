import type { Meta, StoryObj } from '@storybook/react';
import Header from './Header';

const meta = {
  title: 'Prueba/Header',
  component: Header,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    user:{
      name: 'Jane Doe',
    }, 
    onLogin:():JSX.Element | void => {}, 
    onLogout:():void=>{},
    onCreateAccount:():void=>{},
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Logged: Story = {
  args: {
    user: {
      name: 'Francisco Diosdado',
    },
    //onLogin:()=>{alert('Has pulsado el boton Login')},
    onLogout:()=>{alert('Has pulsado el boton Logout')},
    //onCreateAccount:()=>{alert('Has pulsado el boton Sign up')}
  },
};

export const NoLogged: Story = {

};
