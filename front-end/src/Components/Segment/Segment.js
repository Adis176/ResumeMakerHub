'use client'
import React from "react";
import Item from "../Item/Item.js";
import "./Segment.css"
export default function page (props){
    
    const currPos = props.pos;
    return (
        <div className="">
            {props.data[currPos]['items'].map((section, index) => 
                <div key={index} className="
                    flex flex-col 
                    my-8 
                    mx-6 
                    p-4 
                    rounded-lg md:rounded-xl xl:rounded-3xl 
                    segment
                    "
                >
                    {
                        Object.keys(section).map((ele, inde) => 
                            {
                                if(ele != 'features') {
                                    return(
                                        <div className="flex flex-row items-center justify-between ">
                                            <div key={inde} className="relative flex flex-row items-center justify-between w-full">
                                                <div className="segment-input-desc text-xs">{ele[0].toUpperCase()+ele.slice(1)}</div>
                                                <input 
                                                    className="
                                                        font-normal
                                                        text-sm md:text-lg xl:text-2xl 
                                                        my-3 
                                                        py-4 
                                                        px-5
                                                        text-black 
                                                        border-blues-400 
                                                        border-solid 
                                                        border-[3px]
                                                        rounded-lg
                                                        w-3/4 
                                                        focus:border-black
                                                        segment-attribute
                                                        
                                                    " 
                                                    type="text" 
                                                    value={section[ele]}
                                                    onChange={event => props.changeValue(currPos, index, event.target.value, ele)} 
                                                />
                                                {/* <div className="flex flex-row items-center text-center justify-center delete-attribute min-w-[7%] aspect-[1] overflow-hidden" onClick={() => props.eraseAttribute(currPos, index, ele)}>-</div> */}
                                                <div className="relative segment-del bg-[#393838] rounded-full w-[3%] aspect-square flex items-center justify-center" onClick={() => props.eraseAttribute(currPos, index, ele)}>
                                                    <div className=" w-full h-full"></div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            }
                        )
                    }
                    <p className="text-sm mt-4">Feature List:</p>
                    <Item 
                        features={section['features']} 
                        data={props.data} pos={currPos} 
                        addFeature={props.addFeature} 
                        ind={index} 
                        changeFeature={props.changeFeature}
                        eraseFeature={props.eraseFeature}
                    />
                </div>
            )}
        </div>
    );
}