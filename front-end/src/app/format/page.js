'use client'
import React, { useState, useEffect, useCallback} from 'react';
import TextEditor from "../../Components/TextEditor/TextEditor.js";
import MyDropdown from '../../Components/Dropdown/Dropdown.js';
import MyButton from '../../Components/Button/Button.js';
import resumeData from "../../../../back-end/myenv/data/resumeData.json";
import "./format.css";

export default function page(){
    // we first get the data, put it in currData.
    // allSections - array of section objects, prepare each section as name, code = title, package has all details
    // sectionNumber used to point to a particular section - like work exp, project, education etc.
    // currItemList will point to the array of items belonging to a particular section - pointed to by sectionNumber.
    // currItem will point to any particular item - which can be traversed with the help of arrows.
    // pos will refer to the position of currItem in currItemList.
    // currLength will refer to the max value that can be attained by pos.
    // thus we will get all attributes for the currItem, display them in text-editor boxes.
    const [currData, setCurrData] = useState(resumeData['data'] || {});
    const [allSections, setAllSections] = useState([]);
    const [sectionNumber, setSectionNumber] = useState(0);
    const [currItemList, setCurrItemList] = useState([]);
    const [currItem, setCurrItem] = useState({});
    const [pos, setPos] = useState(0);
    const [currLength, setCurrLength] = useState(0);

    useEffect(() => {
        const sections = [];

        for (let section in currData) {
            let tempSection = {
                name: currData[section]['segment_title'] || '',
                code: currData[section]['segment_title'] || '',
                package: currData[section]['items'] || []
            };
            sections.push(tempSection);
        }
        setAllSections(sections);
        if(sections.length > 0){
            setCurrItemList(sections[sectionNumber]['package']);
            setCurrItem(currItemList[pos]);
            setCurrLength(currItemList.length);
        }
    }, []);

    useEffect(() => {
        if (allSections.length > 0) {
            const newCurrItemList = allSections[sectionNumber]['package'] || [];
            setCurrItemList(newCurrItemList);
            setCurrItem(newCurrItemList[pos] || {});
        }
    }, [sectionNumber, pos, allSections, currData]);



    // function incrementPos(){
    //     if(pos < currLength-1) setPos(pos+1);
    // }
    // function decrementPos(){
    //     if(pos > 0) setPos(pos-1);
    // }
    function handleFont(val){
        console.log("Selected val for font: ", val);
        setSectionNumber(val);
    }

    // memoization for less re-rendering
    const incrementPos = useCallback(() => {
        if (pos < currLength - 1) setPos(pos + 1);
    }, [pos, currLength]);

    const decrementPos = useCallback(() => {
        if (pos > 0) setPos(pos - 1);
    }, [pos]);


    return (
        <div className='container flex flex-col items-center justify-center' style={{minHeight: '100vh'}}>
            <div className='w-full flex flex-row'>
                <div className='w-[30%] relative'>
                    <MyDropdown 
                        font={allSections} 
                        handleFont={handleFont} 
                        size='xl' 
                        label='Select Section'
                        default={`${allSections.length>0 ?  allSections[0]['name'] : '' }`}
                    />
                </div>
                <div className='w-[70%]'>
                    <div className='flex flex-col items-center text-center'>
                        {
                            currItem &&
                            Object.keys(currItem).length > 0 && 
                            Object.keys(currItem).map((instance, ind) =>
                                <div key={ind}>
                                    {/* <div>{instance}</div> */}
                                    <TextEditor 
                                        currData={currData}
                                        allSections={allSections}
                                        sectionNumber={sectionNumber}
                                        currItemList={currItemList}
                                        currItem={currItem}
                                        pos={pos}
                                        currLength={currLength}
                                    />
                                    {/* {currItem[instance]?.['main']} */}
                                </div>
                            )
                        }
                    </div>
                    <div id="view_nav" className="flex flex-row items-center justify-between cursor-pointer my-6">
                        <div 
                            className={`relative bg-black w-[14%] xl:w-[5%] aspect-[1] rounded-full cursor-pointer ${pos==0 ? 'view-chng' : ''}`}
                            onClick={decrementPos}
                        >   
                            <div className="resume-triangle-right"></div> 
                        </div>

                        <div 
                            className={`relative bg-black w-[14%] xl:w-[5%] aspect-[1] rounded-full cursor-pointer ${pos==0 ? 'view-chng' : ''}`}
                            onClick={incrementPos}
                        >
                            <div className="resume-triangle-left"></div> 
                        </div>
                    </div>
                </div>
            </div>
            <MyButton text='Save & Continue' size={'md'} color={'btn1'} />
        </div>
    );
}