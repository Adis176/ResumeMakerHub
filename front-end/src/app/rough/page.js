'use client'
import React, { useState, useEffect, use} from "react";
import { useAuth } from "../api/auth/authContext.js";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { supabase } from "../../utils/supabase/client.js";
import { createClient } from "../../utils/supabase/server.js";
import { supabaseAdmin } from "../../utils/supabase/client.js";

import TextEditor from "../../Components/TextEditor/TextEditor.js";
import "./rough.css";

// import and use client from server client component - as it helps to refresh and set cookies. 
// const supabase = createClient();



export default function page(){
    const { authState, userId, userEmail } = useAuth();
  
    return (
      <div>
        <h1>User Profile</h1>
        <p>User ID: {userId}</p>
        <p>User Email: {userEmail}</p>
        <p>Auth State: {authState ? 'Logged in' : 'Logged out'}</p>
      </div>
    );
  };