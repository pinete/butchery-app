import React from 'react'
import Container from '../01_atomos/Container'
import Button from '../01_atomos/MotionButton'
const Header = ({ children }) => {
  return (
    <div>
      <Container type='header'>
        <Button />
        {children}
      </Container>
    </div>
  )
}

export default Header