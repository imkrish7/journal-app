import React from 'react'
import { Sheet } from './ui/sheet'
import RobotLottie from './icons/RobotLottie'
import { Input } from './ui/input'
import { Button } from './ui/button'

const ChatInterface = () => {
  return (
    <Sheet>
      <div className='flex items-center gap-2'>
        <div className='w-[60px] h-[60px]'>
          <RobotLottie />
        </div>
        <Input placeholder='Talk to me....' />
        <Button>Send</Button>
        </div>
    </Sheet>
  )
}

export default ChatInterface