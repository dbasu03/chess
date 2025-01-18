import React from 'react'
import { useNavigate } from "react-router";

const Landing = () => {
  const navigate=useNavigate()  
  return (
    
    <button onClick={()=>{
        navigate('/game')
    }}   className="bg-red-200"> Join game</button>
  )
}

export default Landing