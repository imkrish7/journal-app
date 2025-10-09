"use client"
import ChatInterface from '@/components/ChatInterface'
import Message from '@/components/Message'
import React from 'react'

const message = "So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist."

const page = () => {
  return (
    <div className='flex flex-col'>
      <div className='flex-1 gap-2 flex flex-col'>
        <Message who='USER' message='Hello' userAvatarLink='' />
        <Message who='AI' message={message} userAvatarLink='' />
      </div>
      <ChatInterface />
    </div>
  )
}

export default page