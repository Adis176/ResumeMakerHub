'use client'
import React, { useState } from "react";
import {getUserDetails} from "../../utils/supabase/user.js";
import MyInput from "../../Components/Input/Input";
import MyButton from "../../Components/Button/Button";
import MyCheckbox from "../../Components/Checkbox/Checkbox";
import { supabase } from "../../utils/supabase/client";
// upload page
// make it such that all fields like name are already present, and make them required.
export default function page(){
    const [priv, setPriv] = useState(true);
    const [submitError, setSubmitError] = useState("");
    function handleCheckbox() {
      setPriv(!priv);
    }

    async function uploadResume(currData){
        let url = currData.get("url");
        let tagList = null;
        if(!priv){
            tagList = currData.get("tags");
            tagList = tagList.split(" ");
            if(tagList.length > 10){
                tagList = tagList.splice(0, 10);
            }
            for(let item in tagList){
                tagList[item] = tagList[item].toLowerCase();
            }
        }
        
        let userData = await getUserDetails();
        // console.log("uploaded data: ", url, tagList, priv, userData['data']['user']['id']);


        if(priv){
            const { error } = await supabase
            .from('resumePriv')
            .insert({ userid: userData['data']['user']['id'], resumeUrl: url});
        }
        else{
            const { data, error } = await supabase
            .from('resumePub')
            .insert({ userid: userData['data']['user']['id'], resumeUrl: url})
            .select();

            if(error){
                setSubmitError('Resume submit error. Likely that duplicate link posted.');
                console.log("Error in submitting resume");
                return;
            }
            console.log("data: ", data );
            let newResumePubId = data[0]['resumePub_id'];
            
            // tags
            for (let tag in tagList){
                let {data, error} = await supabase
                .from('tags')
                .select()
                .eq('tag_name', tagList[tag]);
                console.log("check past tag: ", data);
                
                let tagData;
                if(data != null && data.length>0){
                    tagData = data[0]['tag_id'];
                    console.log("TagData obtained: ", data);
                } else{
                    const { data, error } = await supabase
                    .from('tags')
                    .insert({ tag_name: tagList[tag] })
                    .select();
                    if(error) console.log("Error: ", error);
                    else console.log("inserted tag data: ", data);
                    tagData = data[0]['tag_id'];
                }
                
                if(newResumePubId && tagData){
                    const {error} = await supabase
                    .from('tag_resume')
                    .insert({ tag_resume_id: tagData, resume_id: newResumePubId});

                    if(error){
                        console.log("Error in attaching tag to resume: ", error);
                    }
                }
            }

        }
    }
    return (
        <div 
            className="max-w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-8 md:mx-auto my-4 shadow-lg shadow-blues-100 border-solid border-[1.7px] border-slate-400 rounded-lg p-4 flex flex-col gradient-bg"
        >
            <form className="flex flex-col items-center" action={uploadResume}>
                {/* Put one to upload pdf */}
                <MyInput 
                    color="classic"
                    variant="outlined"
                    label="Url"
                    name="url"
                />
                {
                    !priv &&
                    <MyInput 
                    color="classic"
                    variant="outlined"
                    label="Tags"
                    name="tags"
                    multiline={true}
                    line={4}
                    placeholder='Enter each tag separated by a space. Max 10 tags will be parsed.'
                />}
                <div className="w-full">
                    <MyCheckbox
                        className="md:col-span-2 w-full max-h-full overflow-hidden rounded-r-2xl"
                        name="icon"
                        label="Keep Resume Private"
                        onClick={handleCheckbox}
                    />
                </div>
                <MyButton
                    type="submit"
                    size="xl"
                    color="btn4"
                    text="Submit Resume"
                />
                {submitError}
            </form>
        </div>
    );
}