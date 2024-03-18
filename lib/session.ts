import { createServerComponentClient, createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function getSession() {
    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })

    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
        console.error(error)
        return null
    }

    return session
}


export async function getRouteSession() {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const { data: { session }, error } = await supabase.auth.getSession()

    if (error) {
        console.error(error)
        return null
    }

    return session
}