import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export function createClient() {
  return createClientComponentClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

export function createAdminClient(){
    return createClientComponentClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
    );
}

// create an anon - unknown/anonymous user function to be used for supabase, export it.
export const supabase = createClient();

// create an instance of the admin - to make all the changes to all the tables as req. Has more access as per role.
export const supabaseAdmin = createAdminClient();