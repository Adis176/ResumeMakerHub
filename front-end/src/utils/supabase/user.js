'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
const supabase = createServerComponentClient({ cookies });
export async function getUserDetails(){
    let data = await supabase.auth.getUser();
    return data;
}