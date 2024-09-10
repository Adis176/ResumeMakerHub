'use client'
import React, {useState, useEffect, use} from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Save from "../../Components/Save/Save.js";
import RateResume from "../../Components/RateResume/RateResume.js";
import { supabase } from '../../utils/supabase/client';
import "./dashboard.css";

// dashboard page
export default function page() {
    const [currUser, setCurrUser] = useState(null);
    const [data, setData] = useState(null);
    const [savedResumes, setSavedResumes] = useState(null);
    const [refreshFlag, setRefreshFlag] = useState(0);

    async function fetchResumeId(val){
        let {data, error} = await supabase
        .from('resumePub_id')
        .select('id')
        .eq('resumeUrl', val)
        if(error) return null;
        return data[0]['resumePub_id'];
    }
    const columns = [
        { field: 'id', headerName: 'ID', width: 100, sortable: true, align: 'left' },
        { field: 'resumeUrl', headerName: 'Resume URL', width: 200, sortable: true, align: 'left' },
        { field: 'tags', headerName: 'Tags', width: 150, sortable: true, align: 'left' },
        { field: 'save', headerName: 'Save', width: 100, sortable: false, align: 'left', renderCell: (params) => <Save params={params} savedResumes={savedResumes} currUser={currUser} setRefreshFlag={setRefreshFlag} /> },
        { field: 'rate', headerName: 'Rate', width: 200, sortable: false, align: 'left', editable: true, renderCell: (params) => <RateResume params={params} currUser={currUser} setRefreshFlag={setRefreshFlag} /> },
        { field: 'avg_rating', headerName: 'Ratings', width: 200, sortable: true, align: 'left' },
        { field: 'rating_count', headerName: 'Total people rated', width: 200, sortable: true, align: 'left' },
    ];
    

    async function fetchUserDetails(){
        const { data: { user } } = await supabase.auth.getUser();
        if(user){
            let userId = user.id;
            return userId;
        } else{
            console.log("Dashboard - couldn't fetch user");
            return -1;
        }
    }

    async function fetchAllData(){
        const data = await supabase
            .from('resumePub')
            .select(`
                resumePub_id,
                resumeUrl,
                tags(tag_name),
                avg_rating,
                rating_count
            `);

        return data['data'].map((row, ind) => ({
            id: row.resumePub_id,
            resumeUrl: row.resumeUrl,
            tags: row.tags.map((tag) => tag['tag_name']),
            avg_rating: row.avg_rating,
            rating_count: row.rating_count
        }));
    }

    async function fetchSavedResumes(){
        let {data, error} = await supabase
        .from('resume_saved')
        .select();
        if(error){
            console.log("Cannot fetch resumes for current user");
            return null;
        }
        return data;
    }

    useEffect(() => {
        async function getUserDetails(){
            let currUserDetails = await fetchUserDetails();
            setCurrUser(currUserDetails);
        }
        getUserDetails();

        let getSavedResumes = async () => {
            let tempSavedResumes = await fetchSavedResumes();
            console.log("tempSavedResumes");
            setSavedResumes(tempSavedResumes);
        }
        getSavedResumes();
    }, []);

    useEffect(() => {
        let getAllData = async () => {
            let tempData = await fetchAllData();
            setData(tempData);
        }
        getAllData();
    }, [refreshFlag]);
      
    return (
        <div className="h-[400px] w-[90%] mx-auto my-4 items-left justify-left" >
            <DataGrid
                rows={data}
                columns={columns}
                slots={{
                    toolbar: GridToolbar,
                }}
                loading={data == null}
                slotProps={{
                    loadingOverlay: {
                    variant: 'linear-progress',
                    noRowsVariant: 'skeleton',
                    },
                }}
            />
           
            {/* {data && data.map((item, ind) => 
            {
                return (
                    <div className='mt-8'>
                        {JSON.stringify(item)}
                    </div>
                )
            })} */}

            {/* {JSON.stringify(data, 2, null)} */}
        </div>
    );
}
