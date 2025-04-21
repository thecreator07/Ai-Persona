'use client'

import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const NavigateButton = () => {

    const router=useRouter()
  return (
    <div>
       <Button onClick={()=>router?.push('/chat')}>
          Go to Dashboard
        </Button>
    </div>
  )
}

export default NavigateButton
