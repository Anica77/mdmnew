import React, { useState, useEffect } from "react";
import supabase from "../Supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function AdminLogin({ handleSessionChange }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      handleSessionChange(session); // Call the function to update session in App.js
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      handleSessionChange(session); // Call the function to update session in App.js
    });

    return () => subscription.unsubscribe();
  }, [handleSessionChange]);

  if (!session) {
    return (
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          style: {
            width: "140px",
          },
        }}
        showLinks={false}
        providers={[]}
      />
    );
  } else {
    return <div>Logged in!</div>;
  }
}
