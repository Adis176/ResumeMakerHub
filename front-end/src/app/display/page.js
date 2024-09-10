'use client'
import React, {useState, useEffect} from "react";
import Segment from "../../Components/Segment/Segment.js";
import MyButton from "../../Components/Button/Button.js";
import oldData from "../../data/data.json";
import "./Display.css";
export default function page(){
    const [currData, setCurrData] = useState(oldData['data']);
    const [pos, setPos] = useState(0);

    useEffect(() => {
        
    }, [currData]);
    function incrementPos(){
        if(pos !== currData.length-1) setPos(pos+1);
    }
    function decrementPos(){
        if(pos !== 0) setPos(pos-1);
    }
    function addSegment(seg){
        let newData = [...currData];
        let newSeg = seg;
        newData.push(newSeg);
        setCurrData(newData);
        console.log(currData);
    }
    function addFeature(pos, index, str){
        console.log(pos, index, str);
        const newData = [...currData];
        newData[pos]['items'][index]['features'].push(str);
        setCurrData(newData);
    }
    function changeTitle(pos, ind, str){
        const newData = [...currData];
        newData[pos]['items'][ind]['title'] = str;
        setCurrData(newData);
    }
    function changeHeading(pos, ind, str){
        const newData = [...currData];
        newData[pos]['items'][ind]['heading'] = str;
        setCurrData(newData);
    }
    function changeDescription(pos, ind, str){
        const newData = [...currData];
        newData[pos]['items'][ind]['description'] = str;
        setCurrData(newData);
    }
    function changeFeature(pos, ind, num, str){
        const newData = [...currData];
        newData[pos]['items'][ind]['features'][num] = str;
        setCurrData(newData);
    }
    function changeValue(pos, ind, str, ele){
        const newData = [...currData];
        newData[pos]['items'][ind][ele] = str;
        setCurrData(newData);
    }
    function eraseAttribute(pos, ind, ele){
        const newData = [...currData];
        newData[pos]['items'][ind][ele] = "";
        setCurrData(newData);
    }
    function eraseFeature(pos, ind, num){
        let newData = [...currData];
        newData[pos]['items'][ind]['features'].splice(num, 1);
        setCurrData(newData);
    }
    const createNewFile = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/save-resume-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: currData }),
            });
    
            if (!response.ok) {
                throw new Error('Failed to save file');
            }
    
            const result = await response.text();
            console.log("success: ", resulr);
        } 
        catch (error) {
            console.error('Error saving file:', error);
        }
    };

    return (
        <div className="container flex flex-col items-center justify-center min-h-[100vh]">
            <div className="flex flex-col w-5/6 bg-slate-200">
                <div className="w-full bg-white border-slate-500 border-2 
                    rounded-2xl md:rounded-[2rem] xl:rounded-[3rem] 
                    mt-8 md:mt-12 xl:mt-16
                    overflow-hidden"
                >
                    <div className="w-full bg-blues border-b-gray-900 border-solid border-[0.7px] py-6 text-white text-center font-bold text-2xl">
                        {currData[pos]['segment_title'][0].toUpperCase()+currData[pos]['segment_title'].slice(1)}
                    </div>
                    <Segment 
                        data={currData}
                        pos={pos}
                        addFeature={addFeature} 
                        addSegment={addSegment} 
                        changeTitle={changeTitle}
                        changeHeading={changeHeading}
                        changeDescription={changeDescription}
                        changeFeature={changeFeature}
                        changeValue={changeValue}
                        eraseAttribute={eraseAttribute}
                        eraseFeature={eraseFeature}
                    />
                </div>
                <div className="flex flex-row w-full justify-between bg-red-100 my-8 ">
                    <div 
                        className={`relative bg-black w-[14%] aspect-[1] rounded-full cursor-pointer ${pos==0 ? 'view-chng' : ''}`}
                        style={{content: ''}}
                        onClick={decrementPos}
                    >   
                        <div className="triangle-right"></div> 
                    </div>
                    {/* <div className="font-bold">{pos}</div> */}
                    <div 
                        className={`relative bg-black w-[14%] aspect-[1] rounded-full cursor-pointer ${pos==currData.length-1 ? 'view-chng' : ''}`} 
                        style={{content: ''}}
                        onClick={incrementPos}
                    >
                        <div className="triangle-left"></div> 
                    </div>
                </div>
                <MyButton size="md" color="btn1" text="Click Me" onClick={() => createNewFile()} />
            </div>
        </div>
    );
}