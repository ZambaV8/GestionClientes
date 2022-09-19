import React from 'react'

const Alerta = ({children}) => {
  return (
    <div className="bg-red-600 text-center p-3 uppercase text-white my-4 font-bold">
                  {children}
    </div>
  )
}

export default Alerta