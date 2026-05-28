import CalendarProvider from '@/providers/calender-provider'
import React from 'react'

interface IProps {
    children: React.ReactNode,
    modal?: React.ReactNode
}

const layout = ({ children, modal }: IProps) => {
  return (
    <CalendarProvider>
        {children}
        {modal}
    </CalendarProvider>
  )
}

export default layout