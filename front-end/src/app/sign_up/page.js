'use client'

import { useState } from 'react';
import MyInput from '../../Components/Input/Input';
import MyButton from '../../Components/Button/Button';
import { supabase } from '../../utils/supabase/client';

function Page() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // instantiate supabase client
  // const supabase = createClientComponentClient();

  // const handleEmailChange = (event) => {
  //   setEmail(event.target.value)
  // };

  // const handlePasswordChange = (event) => {
  //   setPassword(event.target.value)
  // };

  const handleSubmit = async (event) => {
    // event.preventDefault();
    setError('');
    setSuccess('');
    let email = event.get("email");
    let password = event.get("password");
    let first_name = event.get("first_name");
    let last_name = event.get("last_name");
    let organization = event.get("organization");
    let years = event.get("years");

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            first_name: first_name || "",
            last_name: last_name || "",
            organization: organization || "",
            years: years || 0,
            email: email || "",
          },
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
        },
      });

      if (error) throw error;

      setSuccess('Check your email for the confirmation link');
    } 
    catch (error) {
      if (error.message === 'User already registered') {
        setError('This email is already registered. Try logging in instead.');
      } else if (error.message === 'Too many requests') {
        setError('Too many attempts. Please try again later.');
      } else {
        setError(error.message || 'An error occurred. Please try again.');
      }
    }
    console.log("Sign up detials: ", email, password);
  };

  return (
    <div className='flex flex-col items-center justify-center m-auto'>
      <form action={handleSubmit} className='w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-8 md:mx-auto my-4 rounded-xl border-solid border-[2px] border-slate-400 p-8 gradient-bg flex flex-col items-center justify-center'>
        <MyInput
          color="classic"
          variant="outlined"
          size="xxl"
          label="First Name"
          name="first_name"
          required={true}
        />
        <MyInput
          color="classic"
          variant="outlined"
          size="xxl"
          label="Last Name"
          name="last_name"
          required={true}
        />
        <MyInput
          color="classic"
          variant="outlined"
          size="xxl"
          label="Organization"
          name="organization"
          required={false}
        />
        <MyInput
          color="classic"
          variant="outlined"
          size="xxl"
          label="Years of experience"
          name="years"
          required={false}
          type="number"
        />
        <MyInput
          color="classic"
          variant="outlined"
          size="xxl"
          label="Email"
          name="email"
          required={true}
        />
        <MyInput
          color="classic"
          variant="outlined"
          size="xxl"
          label="Password"
          name="password"
          required={true}
        />
        <MyButton
          type="submit"
          size="xxl"
          color="btn4"
          text="Sign up"
        />
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {success && <p style={{color: 'green'}}>{success}</p>}
    </div>
  );
}

export default Page;