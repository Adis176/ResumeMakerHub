import React, { useState, useEffect, Suspense } from "react";
import { Rating } from "@mui/material";
import { supabase } from "../../utils/supabase/client";

// pass userId as currUser
// 

function RateResume({ params, currUser, setRefreshFlag }) {
    // console.log("params: ", params);
    const [rating, setRating] = useState(0);
    const [pres, setPres] = useState(false);

    useEffect(() => {
        async function setResumeRating() {   
            const { data: ratingData, error: ratingError } = await supabase
            .from('resume_rating')
            .select('attributed_rating')
            .eq('rated_user_id', currUser)
            .eq('rated_resume_id', params.id);
    
            if (ratingData && ratingData.length > 0) {
                setRating(ratingData[0]['attributed_rating']);
                setPres(true);
            } else {
                console.log("No rating found for this resume");
            }
        }

        // async function assignRatings(){
        //     if(currUser != null){
        //         console.log("curr user: ", currUser);
        //         if(resumeId){
        //             const { data, error } = await supabase
        //             .from('resume_rating')
        //             .select('attributed_rating')
        //             .eq('rated_user_id', currUser)
        //             .eq('rated_resume_id', resumeId);

        //             if(data.length>0){
        //                 setRating(data[0]['attributed_rating']);
        //                 setPres(true);
        //             }
        //         } else{
        //             console.log("couldnt fetch curr resume details");
        //         }
        //     } else{
        //         console.log("trouble in getting curr user details");
        //     }
        // }

        async function exec(){
            await setResumeRating();
            // await assignRatings();
        }
        exec();
    }, [rating]);

    const handleRatingChange = async (event, newValue) => {
        // setRating(newValue);

        // if (userId) {
        //     let resumeId = await fetchResumeId(params.id);
        //     console.log("resume id, user id, rating: ", resumeId, userId, newValue);
        try {
            const { data, error } = await supabase.from("resume_rating").upsert({
                    rated_resume_id: params.id,
                    rated_user_id: currUser,
                    attributed_rating: newValue,
                },
                {
                    onConflict: ["rated_resume_id", "rated_user_id"],
                    returning: "minimal",
                }
            );
            

            // update avg rating
            let old_rating, count;
            if(pres){
                old_rating = rating;
                count = params.row.rating_count;
            } 
            else{
                old_rating = params.row.avg_rating;
                count = params.row.rating_count + 1;
            }
            let new_rating_diff = newValue - old_rating;
            new_rating_diff = new_rating_diff / count;
            let new_avg = params.row.avg_rating + new_rating_diff;

            // make update to existing value in resumePub.
            const { error: updateResumePubError} = await supabase
            .from('resumePub')
            .update({avg_rating: new_avg, rating_count: count})
            .eq('resumePub_id', params.id);
            if(updateResumePubError){
                console.log("Cannot update ratings");
            }

            setRating(newValue);
            setRefreshFlag((prev) => (prev+1)%100);
            if (error) throw error;
            console.log("Rating saved successfully");
        } catch (error) {
            console.error("Error saving rating:", error.message);
        }
    };

    return <Rating value={rating} onChange={handleRatingChange} />;
}

export default RateResume;
