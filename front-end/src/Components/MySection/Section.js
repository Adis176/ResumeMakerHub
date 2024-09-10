import React from "react";
import MyInput from "../Input/Input";
// import MyAttribute from "../MyAttribute/MyAttribute.js";
import "./MySection.css";
export default function MySection(props) {
    const currPos = props?.pos;
    return (
        <div 
            className={`
                ${props.className} 
                shadow-md shadow-blue-500 
                rounded-lg 
                p-6
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
            <div>
                {
                    props?.data[currPos]['items']?.map((section, index) => 
                    <div key={index} className="flex flex-row items-center justify-between">
                        <div className="flex flex-col w-full bg-blue-400 my-8 p-6 rounded-lg segment text-white">
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

                            {/* <p className="font-bold mt-4">Feature List:</p>
                            <div className="flex flex-row items-center justify-between w-full">
                                <MyInput 
                                    variant="outlined" 
                                    choice='dark' 
                                    value={section['features']} 
                                    label={'features'}
                                    multiline={true}
                                />
                                <div className="relative section-del bg-[#393838] rounded-full w-[5%] aspect-square flex items-center justify-center cursor-pointer" onClick={() => props.eraseAttribute(currPos, index, ele)}>
                                    <div className=" w-full h-full"></div>
                                </div>
                            </div> */}

                        </div>
                        <div onClick={() => props?.delSection(currPos, index)} className="ml-4 cursor-pointer">
                            del
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
