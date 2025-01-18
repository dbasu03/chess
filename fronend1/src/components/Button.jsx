import React from 'react'

const Button = ({ onClick, children }) => {
  return (
  <button onClick={()=>{
}}   className="bg-red-200"> 
        {children}
    </button>
    )
}

export default Button