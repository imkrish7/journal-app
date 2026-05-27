import CalendarProvider from '@/providers/calender-provider'
import React from 'react'

interface IProps {
    children: React.ReactNode
}

const layout = ({ children }: IProps) => {
  return (
    <CalendarProvider>
        {children}
    </CalendarProvider>
  )
}

export default layout