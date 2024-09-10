import React from "react";
import { TextEditorList } from "../TextEditorList/TextEditorList";
import "./MySection.css";
import MyButton from "../Button/Button";

export default function MySection(props) {
    const pos = props?.pos;
    const data = props?.data;
    return (
        <div
            className={`
                shadow-xl shadow-blues-200 
                rounded-lg 
                p-6
                w-full
                lg:w-initial
                ${props.className} 
            `}
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
            <TextEditorList
                data={data}
                pos={pos}
                delSection={props.delSection}
                eraseAttribute={props.eraseAttribute}
                handleInputChange={props.handleInputChange}
            />
            <div id="view_nav" className="flex flex-row items-center justify-between cursor-pointer my-6">
                <div 
                    className={`relative bg-black w-[6%] aspect-[1] rounded-full cursor-pointer ${pos==0 ? 'resume-view-chng' : ''}`}
                    onClick={props.decrementPos}
                >   
                    <div className="resume-triangle-right"></div> 
                </div>
                <MyButton size='xl' color='btn3' text='Add Segment' onClick={props.addSection} className='rounded-md' />
                <div 
                    className={`relative bg-black w-[6%] aspect-[1] rounded-full cursor-pointer ${pos==data.length-1 ? 'resume-view-chng' : ''}`} 
                    onClick={props.incrementPos}
                >
                    <div className="resume-triangle-left"></div> 
                </div>
            </div>
            
        </div>
    );
}
