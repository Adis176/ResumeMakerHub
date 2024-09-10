import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export default async function Page() {
    const supabase = createServerComponentClient({ cookies });

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
        console.error("Error fetching user:", error);
        return <div>Error fetching user details</div>;
    }

    return (
        <div>
            <h1>User Details</h1>
            {user ? (
                <pre>{JSON.stringify(user, null, 2)}</pre>
            ) : (
                <p>No user found</p>
            )}
        </div>
    );
}