'use server'

import { cookies } from 'next/headers'
 
export interface User {
    name: string
}

export interface Session {
    user?: User
}

export async function handleLogin(sessionData: Session) {
  const encryptedSessionData = encrypt(sessionData)

  cookies().set('session', encryptedSessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // One week
    path: '/',
  })
}

export async function getSession() : Promise<Session> {
    const encryptedSessionData = cookies().get('session')?.value
    return encryptedSessionData ? JSON.parse(decrypt(encryptedSessionData)) : {}
}

