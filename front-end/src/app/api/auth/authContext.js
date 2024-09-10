'use client'
import React, { createContext, useContext, useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createClient } from "../../../utils/supabase/client.js";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const supabase = createClientComponentClient();
  const [authState, setAuthState] = useState(null);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        // console.log(event, session);
        if (event === "SIGNED_IN") {
          // console.log("Signed in")
          setAuthState(session);
          if(session){
            if(session['user']){
              if(session['user']['id']){ 
                setUserId(session['user']['id']);
                localStorage.setItem('userId', session['user']['id']);
              }
              if(session['user']['email']){
                setUserEmail(session['user']['email']);
                localStorage.setItem('userEmail', session['user']['email']);
              }
            }
          }
        } else if (event === "SIGNED_OUT") {
          // console.log("Signed out")
          setUserEmail("");
          setUserId("");
          localStorage.removeItem("userId");
          localStorage.removeItem("userEmail"); 
          setAuthState(null);
        } else if (
          event === "INITIAL_SESSION" ||
          event === "TOKEN_REFRESHED" ||
          event === "USER_UPDATED"
        ) {
          // console.log("updates")
          setAuthState(session);
          if(session){
            if(session['user']){
              if(session['user']['id']){ 
                setUserId(session['user']['id']);
                localStorage.setItem('userId', session['user']['id']);
              }
              if(session['user']['email']){
                setUserEmail(session['user']['email']);
                localStorage.setItem('userEmail', session['user']['email']);
              }
            }
          }
        }
      }
    );

    return () => {
    //   subscription.unsubscribe();
    };
  }, [supabase]);

  const value = {
    authState,
    userId,
    userEmail,
    setAuthState,
    setUserId,
    setUserEmail
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};