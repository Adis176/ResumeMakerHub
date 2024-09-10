'use client'

import { useState } from 'react'
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import MyButton from '../../Components/Button/Button';
import MyInput from "../../Components/Input/Input";
import dayjs from 'dayjs';
// import { redirect } from 'next/dist/server/api-utils';
function page() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [date, setDate] = useState(dayjs());
  const [font, setFont] = useState(0);
  const router = useRouter();
  function handleDateChange(newDate) {
    setDate(newDate);
    console.log("date: ", newDate.format('YYYY-MM-DD'));
  }
  // instantiate supabase client
  const supabase = createClientComponentClient()
  
  // const handleEmailChange = (event) => {
  //   setEmail(event.target.value)
  // };

  // const handlePasswordChange = (event) => {
  //   setPassword(event.target.value)
  // };

  const handleSubmit = async (event) => {
    // event.preventDefault();
    let email = event.get("email");
    let password = event.get("password");
    console.log("Login signininfo: ", email, password);
    // sends a signIn request to supabase, authenticating the user
    const {data, error} = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    
    // Here you can write code to give visual feedback to the user
    // based on the success or failure of the sign-in procedure.
    // E.g. Toast notifications.
    if(!error) {
      console.log(email, password, 'success');
      router.push('/dashboard');
    }
  };

  async function handleSignout(){
    let { data, error } = await supabase.auth.signOut();
    if(error) throw(`Error in signing out: ${error}`);
    else {
      console.log("Signed out");
    }
    // router.push("/");
  }

  return (
    <div className='flex flex-col items-center justify-center m-auto'>
      {/* <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required      
            className='border-[2px] border-solid border-black rounded-lg my-8 ml-12 p-1'      
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className='border-[2px] border-solid border-black rounded-lg my-8 ml-12 p-1'
          />
        </div>
        <div>
          <button type="submit" className='border-2 border-solid border-green-600 py-2 px-6 my-4 rounded-md font-xl font-extrabold'>Submit</button>
        </div>
      </form> */}
      <form action={handleSubmit} className='w-full md:w-3/4 lg:w-2/3 xl:w-2/5 mx-8 md:mx-auto my-4 lg:my-12 xl:my-16 rounded-xl border-solid border-[2px] border-slate-400 p-8 lg:p-16 gradient-bg flex flex-col items-center justify-center'>
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
        <div className='flex flex-row items-center justify-between w-full'>
          <MyButton
            type="submit"
            size="xxl"
            color="btn4"
            text="Log In"
            className="mr-8"
          />
          <MyButton
            size="xxl"
            color="btn4"
            text="Sign Out"
            onClick={handleSignout}
            className="ml-8"
          />
        </div>
      </form>
      {/* <button onClick={handleSignout} className='border-gray-600 border-2 border-solid py-2 px-6'>Log - out</button> */}
    </div>
  );
}

export default page;