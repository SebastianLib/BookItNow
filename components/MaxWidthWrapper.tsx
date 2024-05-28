import React, { ReactNode } from 'react'

const MaxWidthWrapper = ({children}:{children:ReactNode}) => {
  return (
    <div className='container min-h-screen pt-32 mx-auto '>{children}</div>
  )
}

export default MaxWidthWrapper