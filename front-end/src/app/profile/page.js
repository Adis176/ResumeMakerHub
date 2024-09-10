'use client'
import React, {useState, useEffect, use} from "react";
import { supabase } from "../../utils/supabase/client";
// profile page
// all personal details will be showcased

async function fetchPersonalDetails(){
    try {
        const data = await supabase.from('profiles').select();
        return data;
    }
    catch(err) {
        console.log("error in fetching user's personal data");
        return null;
    }
}

async function fetchAllResumeDetails(){
    try{
        const {data} = await supabase
        .from('resumePriv')
        .select();
        return data;
    }
    catch(err){
        console.log("cannot fetch resume: ", err);
        return null;
    }
}

export default function page(){
    const [personalData, setPersonalData] = useState("");
    const [resumeData, setResumeData] = useState("");

    useEffect(() => {

        let getPersonalDetails = async () => {
            let tempData = await fetchPersonalDetails();
            setPersonalData(tempData);
        }
        getPersonalDetails();

        let getAllResumeDetails = async () => {
            let tempResumeData = await fetchAllResumeDetails();
            setResumeData(tempResumeData);
        }   
        getAllResumeDetails();

    }, []);
    console.log("personal data:", personalData);
    return (
        <div>
            <h2>Profile</h2>
            {JSON.stringify(personalData, null, 2)}
            <div></div>
            {JSON.stringify(resumeData, null, 2)}
        </div>
    );
}