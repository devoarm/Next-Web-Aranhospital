
import React from 'react'
import { getCurrentUser } from '@/lib/session';
import NotUser from '@/app/not-user';

interface CreateContentLayoutProps {
    children: React.ReactNode | React.ReactNode[];
}

export default async function ProtectedLayout({children}: CreateContentLayoutProps) {
    const session = await getCurrentUser()

    if(!session) {
        return (
            <NotUser />
        )
    }

  return (
    <>
        {children}
    </>
  );
}
