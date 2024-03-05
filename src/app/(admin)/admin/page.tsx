
import React from 'react'
import { getCurrentUser } from '@/lib/session'

export default async function page() {
    const session = await getCurrentUser()
    
  return (
    <main className='container min-h-screen w-full '>

    <div>{JSON.stringify(session, null, 2)}</div>
    </main>
  )
}
