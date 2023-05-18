// Por ejemplo, podemos crear una molecula que fuera el header, el footer, etc...
// En este caso, un formulario
import React from 'react'
import FormAzul from '../02_moleculas/FormAzul'
import FormRojo from '../02_moleculas/FormRojo'
import Container from '../01_atomos/Container'

const Formulario = () => {
  return (
    <div>
      <Container>
        <FormAzul />
        <FormRojo />
      </Container>
    </div>
  )
}

export default Formulario
