import React from 'react'
import { useNavigate } from 'react-router-dom'

export const NotFoundPage = () => {
  const navigate = useNavigate()
  const navigateTo = (path:string) => {navigate(path)}
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <button onClick = { ()=>navigateTo('/')}> {/* Para ir a una ruta en particular(en este caso '/' -> Home) */}
        {/* esto solo es un ejemplo porque es lo mismo que hacer navigate('/') */}
          Go Back to home
      </button>
    </div>
  )
}
export default NotFoundPage