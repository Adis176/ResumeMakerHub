'use client'
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


const ClientComponentExample = () => {
  const supabase = createClientComponentClient()

  const [data, setData] = useState()

  const handleClick = async () => {
    const { data, error } = await supabase.from("url").select("*");
    console.log("client data: ", data)
    console.log("error: ", error)
    setData(JSON.stringify(data));
  }

  return (
    <div onClick={handleClick}>{data ? data : "Client Components"}</div>
  )
}

export default ClientComponentExample;