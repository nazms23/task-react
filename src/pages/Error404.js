import React, { useEffect } from 'react'

import '../css/Error404.css'

function Error404() {

  useEffect(()=>{
    //* Title değiştirir
    document.title = "Not Found"
  },[])

  return (
    <div className='errordisdiv'>
      <h1>
        404 Page Not Found
      </h1>
    </div>
  )
}

export default Error404