'use client'

import { Session } from '@/lib/session';
import { createContext, ReactNode, Context } from 'react';


export const UserContext: Context<Session> = createContext({});

export function UserProvider({ session, children }: { session: Session, children: ReactNode }) {
    return (
        <UserContext.Provider value={session}>
            {children}
        </UserContext.Provider>
    )
}