import React from 'react'
import { Link } from 'react-router-dom'

export function HomePage() {
  return (
    <div className='flex w-full h-screen justify-center items-center flex-col'><h1 className='font-bold text-2xl'>Hello! To see the contacts, click <Link to="/contacts" className='underline text-blue-600'>here</Link></h1></div>
  )
}
