import React from 'react'

export default function CardLayout( { children }: any ) {
  return (
    <section className="w-full max-w-3xl overflow-hidden rounded-xl bg-violet-100 shadow-lg">
      <div className="px-4 py-5 sm:p-6">
        {children}
      </div>
    </section>
  )
}

