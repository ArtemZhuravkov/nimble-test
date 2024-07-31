import React from 'react'

export function Layout({ children }) {
    return (
        <div className='max-w-[1280px] min-w-[400px] h-screen m-auto'>{children}</div>
    )
}
