'use client'

import { use, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { supabase } from "../../utils/supabase/client";

import ShortUniqueId from 'short-unique-id';

export default function Page() {
    const [inputUrl, setInputUrl] = useState("");
    // const [urlLength, setUrlLength] = useState(10);
    const [fetchedData, setFetchedData] = useState(null);
    const [fetchError, setFetchError] = useState(null);

    function handleValueChange(event) {
        setInputUrl(event.target.value);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("Input obtained: ", inputUrl);

            const { data, error } = await supabase
                .from('url')
                .select()
                .eq('originalUrl', inputUrl);
            console.log("Fetched data: ", data, typeof(data));
            // if (error) {
            //     throw error;
            // }
            if(data==null || data.length==0){
                console.log("Not found");
                const randomId  = new ShortUniqueId({ length: 10 });
                const newShortUrl = randomId.rnd();
                const { error } = await supabase
                .from('url')
                .insert({ 'originalUrl': inputUrl, 'shortUrl': newShortUrl });

                if(error){
                    setFetchError(error);
                    console.log("Error in inserting new obtained shortUrl: ", error);
                }
                const { dataNow } = await supabase
                .from('url')
                .select()
                .eq('originalUrl', inputUrl);
                const displayData = `Your New URL: ${dataNow}`;
                setFetchedData(displayData);
            }
            else{
                const displayData = `URL already exists, its shortened form is: ${data[0]['shortUrl']}`;
                setFetchedData(displayData);
            }
            


        // const { data, error } = await supabase
        // .from('url')
        // .insert([
        //     { 'originalUrl': 'https://myUrl.com', 'shortUrl': 'kuchbhi.com' },
        // ])
        // .select();
        // console.log("Insertion: ", data, error);
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div>
                <form onSubmit={handleSubmit} className="bg-gray-300 rounded-2xl border-2 border-solid border-gray-500 py-4 px-8 my-16 flex flex-col items-center">
                    <input
                        value={inputUrl}
                        onChange={handleValueChange}
                        className="border-2 border-solid border-black py-2 px-6 my-4 rounded-lg"
                        placeholder="Enter URL to be shortened"
                    />
                    <button type="submit" className="my-4 px-4 py-2 rounded-md bg-red-950 text-white text-lg font-bold">
                        Submit
                    </button>
                </form>
            </div>
            {fetchedData && (
                <div className="my-4">
                    <h3>Fetched Data:</h3>
                    <pre>{JSON.stringify(fetchedData, null, 2)}</pre>
                </div>
            )}
            {fetchError && (
                <div className="my-4 text-red-600">
                    <p>Error fetching data: {fetchError}</p>
                </div>
            )}
        </div>
    );
}
