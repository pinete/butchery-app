import Swal from 'sweetalert2'

/*
  *** obj EXAMPLE ***
  const obj = {
    title1: 'Este es el titulo que aparece al inicio',
    title2: 'Titulo que aparece en caso de optar por confirmar',
    text1: 'Texto complementario al title1',
    text2: 'Texto complementario al title2',
    icon1: 'warning', // (warning, error, success, info, question)
    icon2: 'success', // (warning, error, success, info, question)
    confirmButtonText:' Este es el texto del botón de confirmar'
  }
*/

const swBaseOkCancel = (obj, func) => {
  Swal.fire({
    title: obj.title1,
    text: obj.text1,
    icon: obj.icon,
    inputAttributes: {
      id: "modalOkCancel",
    },
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: obj.confirmButtonText,
    focusConfirm: false,
    focusCancel: true
    
  }).then((result) => {
    if (result.isConfirmed) {
      func()
      Swal.fire({
        title: obj.title2,
        text: obj.text2,
        icon: obj.icon2,
        timer: 1000
      })  
    }
  }).catch((e) => console.error(e)) 
}

const useSwal = () => {
  const onDelete = (func, itemName = 'item') => {
    const obj = {
      title1: 'Are you sure?',
      title2: 'Deleted!',
      text1: "You won't be able to revert this!",
      text2: `Your selected ${itemName} has been deleted.`,
      icon1: 'warning',
      icon2: 'success',
      confirmButtonText:'Yes, delete it!'
    }
    swBaseOkCancel(obj, func)
  }

  const onDeleteAll = (func, itemName = 'item') => {
    const obj = {
      title1: 'Are you sure?',
      title2: 'Deleted!',
      text1: `You won't be able to revert this! All ${itemName}s will be deleted`,
      text2: `Your ${itemName}s has been deleted.`,
      icon1: 'warning',
      icon2: 'success',
      confirmButtonText:'Yes, delete them!'
    }
    swBaseOkCancel(obj, func)
  }

  return { onDelete, onDeleteAll }
}

export default useSwal
