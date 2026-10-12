'use server'

import { redirect } from "next/navigation"
import { createClient } from "../lib/supabase/serverClient"

export const Logout = async () => {
    const supabase = await createClient()
    await supabase.auth.signOut()

    redirect("/")
}