// MAIN DISPLAY PAGE – to get all user information
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
    const [currData, setCurrData] = useState(oldData['data']);
    const [pos, setPos] = useState(0);

    let seg = olderData[pos]['items'][0];
    useEffect(() => {
        
    }, [currData]);
    function incrementPos(){
        if(pos !== currData.length-1) setPos(pos+1);
    }
    function decrementPos(){
        if(pos !== 0) setPos(pos-1);
    }
    function addSection(){
        let newData = [...currData];
        newData[pos]['items'].push(seg);
        setCurrData(newData);
    }
    function delSection(pos, ind){
        let newData = [...currData];
        // console.log(newData[pos]['items']);
        newData[pos]['items'].splice(ind);
        setCurrData(newData);
    }
    function handleInputChange(pos, ind, ele, str, html){
        let newData = [...currData];
        newData[pos]['items'][ind][ele]['main'] = str;
        newData[pos]['items'][ind][ele]['format'] = html;
        setCurrData(newData);
    }
    function eraseAttribute(pos, ind, ele){
        let newData = [...currData];
        // console.log("erase attr:", pos, ind, ele, newData[pos]['items'], newData[pos]['items'][ind][ele]);
        newData[pos]['items'][ind][ele]['main'] = "";
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
            console.log("Success: ", result);
            return true;
        } catch (error) {
            console.error('Error saving file:', error);
            return false;
        }
    };

    async function createNewFileAndProceeed(){
        const res = await createNewFile();
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
        <div className='container flex flex-col items-center justify-center' style={{minHeight: '100vh'}}>
            <div id='view-resume' className="w-2/3 md:w-[50%] border-solid border-[0.5px] border-gray-400 py-8 px-24 m-8 rounded-lg">
                <div className="">
                    <MySection 
                        data={currData} 
                        pos={pos} 
                        heading={currData[pos]['segment_title']} 
                        delSection={delSection}
                        eraseAttribute={eraseAttribute}
                        handleInputChange={handleInputChange}
                    />
                </div>
                <div id="view_nav" className="flex flex-row items-center justify-between cursor-pointer my-6">
                    <div 
                        className={`relative bg-black w-[6%] aspect-[1] rounded-full cursor-pointer ${pos==0 ? 'resume-view-chng' : ''}`}
                        onClick={decrementPos}
                    >   
                        <div className="resume-triangle-right"></div> 
                    </div>

                    <div 
                        className={`relative bg-black w-[6%] aspect-[1] rounded-full cursor-pointer ${pos==currData.length-1 ? 'resume-view-chng' : ''}`} 
                        onClick={incrementPos}
                    >
                        <div className="resume-triangle-left"></div> 
                    </div>
                </div>
                <div 
                    className="
                        flex flex-row 
                        items-center justify-center text-center 
                        w-[30%] 
                        bg-blue-600 
                        rounded-lg 
                        border-solid border-blue-900 border-[0.5px] 
                        mx-auto my-8 
                        py-4 px-2 
                        font-bold 
                        text-gray-100 font-lg 
                        cursor-pointer 
                    "
                    onClick={addSection}
                >
                    Add blank Segment
                </div>
            </div>
            <div className='flex flex-row items-center justify-between w-full'>
                <MyButton size='xl' color='btn2' text='Save' onClick={createNewFile} />
                <MyButton size='xl' color='btn2' text='Save & Proceed' onClick={createNewFileAndProceeed} />
            </div>
            {/* <button 
                onClick={createNewFile} 
                className="bg-fuchsia-900 rounded-lg px-6 py-4 my-4 text-white font-bold"
            >
                Save Changes
            </button> */}
        </div>
    );
}




import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react';
import { EditorState, convertFromHTML, ContentState} from 'draft-js';
import { EditorProps } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
// import DOMPurify from 'dompurify';

import './TextEditor.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
    ssr: false,
    loading: () => <p>Loading editor...</p>,
});
  
// disable react strict-mode if error persists. 
// reference: https://jpuri.github.io/react-draft-wysiwyg/#/docs?_k=jjqinp
export default function TextEditor(props){
    let currData = props.currData;
    let pos = props.pos;
    let ind  = props.ind;
    let ele = props.ele;

    const initialContent = `<p>${props.data}</p>`;
    const blocksFromHTML = convertFromHTML(initialContent);
    const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
    );
    const [editorState, setEditorState] = useState(() => {
        const content = contentState
        return EditorState.createWithContent(content);
    });
    

    // used to display the converted content, how it is changed in html.
    const [convertedContent, setConvertedContent] = useState(null);
    
    // editorState is the useState var used to change the values.
    // Initialized as defined above.
    // as per changes made, they will be monitored. 

    // onEditorStateChange, is used to monitor the change of state of the editor. we set it to update the 
    // content as well.
    useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
        const selectionState = editorState.getSelection();
        const anchorKey = selectionState.getAnchorKey();
        const currentContent = editorState.getCurrentContent();
        const currentContentBlock = currentContent.getBlockForKey(anchorKey);
        // const start = selectionState.getStartOffset();
        // const end = selectionState.getEndOffset();
        const selectedText = currentContentBlock.getText().slice();
        props.handleInputChange(pos, ind, ele, selectedText, html);
        // console.log(selectedText);
        console.log("html form: ", html, typeof(html));
    }, [editorState]);

    return (
        <div className="editor-container">
            {/* 
                editorState - property to update state of the editor, refers to the content.
                onEditorStateChange - how changes are monitored.
            */}
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                toolbar={{
                    options: ['inline', 'remove', 'history'],
                    inline: {
                        inDropdown: false,
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                        options: ['bold', 'italic', 'underline'],
                    },
                }}
            />
        </div>
    );
}

export const TextEditorList = (props) => {
    let currData = props.data;
    let pos=props.pos;
    let delSection = props.delSection;
    let eraseAttribute = props.eraseAttribute;
    let handleInputChange = props.handleInputChange;

    return (
        <div>
            {
                currData[pos]['items'].map((item, ind) => {
                    return (
                        <div key={ind}>
                            {
                                Object.keys(item).map((attribute, ele) => {
                                    // console.log("currData:", currData);
                                    // console.log("currData[pos]:", currData[pos]);
                                    // console.log("currData[pos]['items']:", currData[pos]?.['items']);
                                    return(
                                        <div key={ele}>
                                            {/* {attribute['main']} */}
                                            <TextEditor 
                                                data={item[attribute]['main']} 
                                                currData={currData}
                                                pos={pos}
                                                ind={ind}
                                                ele={attribute}
                                                handleInputChange={handleInputChange}
                                            />
                                        </div>
                                    );
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    );
}









import React from "react";
import {TextEditorList} from "../TextEditor/TextEditor";
import "./MySection.css";
export default function MySection(props) {
    const currPos = props?.pos;
    return (
        <div 
            className={
                `${props.className} 
                shadow-md shadow-blue-500 
                rounded-lg 
                p-6`
            }
        >
            <div 
                className="
                    bg-slate-900 
                    text-white 
                    text-center 
                    rounded-[0.3em] 
                    font-bold
                    py-2
                "
            >
                {props?.heading.toUpperCase()}
            </div>
            <div>
                {
                    props?.data[currPos]['items']?.map((section, index) => 
                    <div key={index} className="flex flex-row items-center justify-between">
                        {/* <div className="flex flex-col w-full bg-blue-400 my-8 p-6 rounded-lg segment text-white">
                            {
                                Object?.keys(section)?.map((ele, uni) => 
                                    {

                                            return(
                                                <div key={uni} className="flex flex-row items-center justify-between w-full">
                                                    <MyInput 
                                                        key={uni}
                                                        variant="outlined" 
                                                        choice='dark' 
                                                        value={section[ele]['main']} 
                                                        label={ele}
                                                        placeholder={section[ele]['placeholder']}
                                                        required={section[ele]['req']}
                                                        onChange={(e) =>props.handleInputChange(currPos, index, ele, e.target.value)}
                                                        multiline={ele=='features'}
                                                        className="w-full"
                                                    />
                                                    <div className="relative section-del bg-[#393838] rounded-full w-[5%] aspect-square flex items-center justify-center cursor-pointer" onClick={() => props.eraseAttribute(currPos, index, ele)}>
                                                        <div className=" w-full h-full"></div>
                                                    </div>
                                                </div>
                                            )

                                    }
                                )
                            }

                        </div>
                        <div onClick={() => props?.delSection(currPos, index)} className="ml-4 cursor-pointer">
                            del
                        </div> */}
                        <div>
                            <TextEditorList
                                data={props.data}
                                pos={props.pos}
                                delSection={props.delSection}
                                eraseAttribute={props.eraseAttribute}
                                handleInputChange={props.handleInputChange}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}



