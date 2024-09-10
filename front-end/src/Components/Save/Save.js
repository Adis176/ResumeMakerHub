import React, {useState, useEffect, use} from "react";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { supabase } from "../../utils/supabase/client";
import BookmarkBorder from "@mui/icons-material/BookmarkBorder";
export default function Save({ params, savedResumes, currUser, setRefreshFlag }){
    const [save, setSave] = useState(false);
    // console.log("Save - params: ", params);

    useEffect(() => {
        async function fetchSaveDetails(){
            let {data, error} = await supabase
            .from('resume_saved')
            .select()
            .eq('user_saved', currUser)
            .eq('resume_saved', params.id);

            if(error){
                console.log("Error in fetching saved details: ", error);
            }
            if(data && data.length>0){
                setSave(true);
            }
        }
        fetchSaveDetails();
    }, []);

    async function triggerSave(){
        if(save){
            const response = await supabase
            .from('resume_saved')
            .delete()
            .eq('user_saved', currUser)
            .eq('resume_saved', params.id);
            console.log("deleted resume");
            setSave(false);
        }
        else{
            let {error} = await supabase
            .from('resume_saved')
            .insert({ user_saved: currUser, resume_saved: params.id});
            if(error){
                console.log("Error in saving resume as bookmark");
                return;
            }
            // console.log("Saved resume");
            setSave(true);
        }   
        setRefreshFlag((val) => (val+1)%100)
    }
    return (
        <div onClick={triggerSave}>
            {save ? <BookmarkIcon/> : <BookmarkBorderIcon />}
        </div>
    );
}