// interfaces de DB
export interface linTaskProps {
  id:string, 
  article:string,
  description:string, 
  completed:boolean,
  quantity:string,
  created:Date | undefined,
  modified:Date | undefined
}

export interface famProps {
  idFam:string,
  description:string
  created:Date | undefined,
  modified:Date | undefined
}

export interface subfamProps {
  idSubfam:string,
  idFam:string,
  description:string
  created:Date | undefined,
  modified:Date | undefined
}

export interface articleProps {
  idArt:string,
  idFam:string,
  idSubfam:string,
  description:string,
  published:boolean
  created:Date | undefined,
  modified:Date | undefined
}

// types para etiquetas de hipertexto con tailwind
export type MotionButtonProps = {
  textButton?: string | undefined;
  textColorHover?: string | undefined;
  bg?: string | undefined;
  bgHover?: string | undefined;
  bgDark?: string | undefined;
  bgHoverDark?: string | undefined;
  adjunctClass?: string | undefined;
}

export type MotionInputProps = {
  bg?:string,
  bgHover?:string,
  bgDark?: string, // por ejemplo {'slate-700'}
  bgHoverDark?:string,
  textColorHover?:string, 
  placeHolder?:string,
  adjunctClass?:string,
}

export type MotionTextAreaProps = {
  rows?: number | undefined;
  cols?: number | undefined;
  bg?:string,
  bgHover?:string,
  bgDark?: string, // por ejemplo {'slate-700'}
  bgHoverDark?:string,
  textColorHover?:string,
  placeHolder?:string,
  adjunctClass?:string
}


