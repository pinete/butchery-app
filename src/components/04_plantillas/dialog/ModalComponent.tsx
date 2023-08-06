import React,{useEffect} from "react"
import MotionButton from "../../01_atomos/MotionButton"
import { Button, Card, CardBody, CardFooter, CardHeader, Dialog, Typography } from "@material-tailwind/react"

type BtnProps = {
  textColorHover:string,
  bg:string,
  bgHover:string,
  bgDark:string,
  bgHoverDark:string,
  // textButton=string
  icon:string
}
type ModalProps = {
  title: string;
  modalOpen?: boolean;
  buttonProps?: BtnProps;
  //unmountIfCancel?: boolean;
  children: React.ReactNode;
};
const btnProps:BtnProps = {
  textColorHover:'white',
  bg:'sky-400',
  bgHover:'sky-600',
  bgDark:'sky-600',
  bgHoverDark:'sky-800',
  // textButton={modalProps.textButton}
  icon:'Search' ,
}

const ModalComponent = 
  ({ 
    title = 'Titulo',
    modalOpen = false, 
    buttonProps = btnProps,
    children
  }:ModalProps):JSX.Element => 
{
  const [open, setOpen] = React.useState(modalOpen);
  const handleOpen = () => setOpen((cur) => !cur);

  
  return (
      <>
        <MotionButton  
          textColorHover={buttonProps.textColorHover}
          bg={buttonProps.bg}
          bgHover={buttonProps.bgHover}
          bgDark={buttonProps.bgDark}
          bgHoverDark={buttonProps.bgHoverDark}
          icon={buttonProps.icon} 
          onclick={()=>handleOpen()} /> 
        
        <Dialog
          size="xs"
          open={open}
          handler={handleOpen}
          className="bg-transparent shadow-none"
        >
          <Card className="mx-auto w-full max-w-[24rem]">
            {title && <CardHeader
              variant="gradient"
              color="blue"
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="white">
                {title && title}
              </Typography>
            </CardHeader>}
            <CardBody className="flex flex-col gap-4">
              {children}
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" onClick={handleOpen} fullWidth>
                Cancelar
              </Button>
            </CardFooter>
          </Card>
        </Dialog>
      </>
    
  )
}
export default ModalComponent