'use server'

import { redirect } from "next/navigation"
import { signUpSchema } from "./schemas"
import z from "zod"
import { createClient } from "../lib/supabase/serverClient"

export const SignUp = async (userdata: z.infer<typeof signUpSchema>) => {

    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.signUp(userdata)

    if (error) throw error

    if (user && user.email) {
        const { data, error } = await supabase.from('Users').insert({ id: user.id, email: user.email, username: userdata.username })
        if (error) throw error
    }
    redirect("/")
}