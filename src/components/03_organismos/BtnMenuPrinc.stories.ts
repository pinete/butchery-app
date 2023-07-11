import type { Meta, StoryObj } from '@storybook/react';
import BtnMenuPrinc from './BtnMenuPrinc';

const meta = {
  title: 'Prueba/MenuDesplegable',
  component: BtnMenuPrinc,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {},
} satisfies Meta<typeof BtnMenuPrinc>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Menu:Story = {}