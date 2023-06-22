import React from "react";
import ObjState from "../../../firebase/ObjState";
import GenericTable from "../../03_organismos/GenericTable";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";

import MotionButton from "../../01_atomos/MotionButton";

const ModalObj = (collect:string, textButton:string='',title?:string, arrayFields?:string[]) => {
  let {obj, setObj} = ObjState(collect)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  
  return (
    <>
    <MotionButton  
      textColorHover='white'
      bg='sky-400'
      bgHover='sky-600'
      bgDark='sky-600'
      bgHoverDark='sky-800'
      textButton={textButton}
      icon='Search' 
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
          </CardHeader>
          }
          <CardBody className="flex flex-col gap-4">
            <GenericTable data={obj} fieldsToShow = {arrayFields}/>
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
export default ModalObj
