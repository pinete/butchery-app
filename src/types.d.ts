/**
 * key = ['FieldText', 'FieldArea']
 */
type FieldForm = {
  key: string;
  label: string;
  type: string;
  readOnly?: boolean;
  imageRoute?:string;
  options?:objectData[]; // Array con opciones para el select (en su caso)
};
// interfaces para etiquetas de hipertexto con tailwind
interface MotionButtonProps {
  textButton?: string | undefined;
  textColorHover?: string | undefined;
  bg?: string | undefined;
  bgHover?: string | undefined;
  bgDark?: string | undefined;
  bgHoverDark?: string | undefined;
  adjunctClass?: string | undefined;
  placeholder?:string,
  icon?:string;
  value?:string | number | readonly string[] | undefined,
  // onsubmit?: (data:T)=>void
  onclick?:() => React.JSX.Element | void;
}

interface MotionInputProps {
  bg?:string,
  bgHover?:string,
  bgDark?: string, // por ejemplo {'slate-700'}
  bgHoverDark?:string,
  textColorHover?:string, 
  placeHolder?:string,
  adjunctClass?:string,
  placeholder?:string
}

interface MotionTextAreaProps {
  rows?: number | undefined;
  cols?: number | undefined;
  bg?:string,
  bgHover?:string,
  bgDark?: string, // por ejemplo {'slate-700'}
  bgHoverDark?:string,
  textColorHover?:string,
  placeHolder?:string,
  adjunctClass?:string,
  placeholder?:string
}