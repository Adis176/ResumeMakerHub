'use client'
import { useState, useEffect } from 'react';
import MySection from "../../Components/MySection/MySection.js";
import MyButton from "../../Components/Button/Button.js";
import Item from '../../Components/Item/Item.js';
import oldData from "../../../../back-end/myenv/data/resumeData.json";
import "./resume.css";  

// curData - holds all data
// pos - to refer to a particular section - like projects, education etc.

export default function page(){
    const olderData = oldData['data'];
    const [data, setData] = useState(oldData['data']);
    const [pos, setPos] = useState(0);

    let seg = olderData[pos]['items'][0];
    useEffect(() => {
        
    }, [data]);
    function incrementPos(){
        if(pos !== data.length-1) setPos(pos+1);
    }
    function decrementPos(){
        if(pos !== 0) setPos(pos-1);
    }
    function addSection(){
        let newData = [...data];
        newData[pos]['items'].push(seg);
        setData(newData);
    }
    function delSection(pos, ind){
        let newData = [...data];
        newData[pos]['items'].splice(ind);
        setData(newData);
    }
    function handleInputChange(pos, ind, ele, str, html){
        let newData = [...data];
        newData[pos]['items'][ind][ele]['main'] = str;
        newData[pos]['items'][ind][ele]['format'] = html;
        setData(newData);
    }
    function eraseAttribute(pos, ind, ele){
        let newData = [...data];
        newData[pos]['items'][ind][ele]['main'] = "";
        setData(newData);
    }   
    const createNewFile = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/save-resume-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: data }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to save file');
            }
    
            const result = await response.text();
            console.log("Success: ", result);
            return true;
        } catch (error) {
            console.error('Error saving file:', error);
            return false;
        }
    };

    async function createNewFileAndProceeed(){
        const res = true;
        if(res){
            try {
                const response = await fetch('http://localhost:5000/api/generate-pdf', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ data: 'ats' })
                });
                // DOWNLOAD PDF
                // if (response.ok) {
                //     const blob = await response.blob();
                //     const url = window.URL.createObjectURL(blob);
                //     const a = document.createElement('a');
                //     a.href = url;
                //     a.download = 'resume-content.pdf'; 
                //     document.body.appendChild(a);
                //     a.click();
        
                //     window.URL.revokeObjectURL(url);
                //     document.body.removeChild(a);        
                //     console.log("PDF Downloaded Successfully");
                // } 
                // else {
                //     console.error('Failed to generate PDF');
                // }
            } 
            catch (error) {
                console.error('Error:', error);
            }
        }
    }
    
    return(
        <div className=' flex flex-col items-center justify-center w-full' style={{minHeight: '100vh'}}>
            <div id='view-resume' className="w-full sm:w-3/4 xl:w-full m-8 rounded-lg">
                <MySection 
                    data={data} 
                    pos={pos} 
                    heading={data[pos]['segment_title']} 
                    delSection={delSection}
                    eraseAttribute={eraseAttribute}
                    handleInputChange={handleInputChange}
                    incrementPos={incrementPos}
                    decrementPos={decrementPos}
                    seg={seg}
                    addSection={addSection}
                />
                
                {/* <MyButton size='xl' color='btn3' text='Add Segment' onClick={addSection} className='rounded-sm' /> */}
            </div>
            <div className='flex flex-row items-center justify-between w-full bg-gray-50'>
                <MyButton size='xl' color='btn1' text='Save' onClick={createNewFile} />
                <MyButton size="xl" color="btn1" type="submit" text='Save & Proceed' onClick={createNewFileAndProceeed} />
            </div>
        </div>
    );
}