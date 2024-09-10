import React, {useState} from "react";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import "./Item.css";
export default function Item(props){
    const [add, setAdd] = useState("");
    const currPos = props.pos;
    const currInd = props.ind;
    function handleInputChange(event){
        setAdd(event.target.value);
    }
    function handleAddFeature(){
        if(add==="") alert("Please enter any value to add to the Feature list");
        else props.addFeature(currPos, currInd, add);
    }
    return (
        <div className=" relative">
            {/* {props.ind} */}
            {props?.features?.map((item, index) => 
                <div key={index} className="relative flex flex-row items-center justify-between">
                    {/* <div>
                        {item}
                    </div> */}
                    <input type="text" value={item} onChange={event => props.changeFeature(currPos, currInd, index, event.target.value)} className="item border-solid border-b-[2px] border-blues-600 my-1 pl-4 py-1 w-1/2 text-gray-500 text-sm" />
                    <div onClick={() => props.eraseFeature(currPos, currInd, index)} className="w-[3%] aspect-square overflow-hidden border-blue-700 border-[2px] border-solid rounded-full relative">
                        <CloseOutlinedIcon className="feature-del" />
                    </div>
                </div>
            )}
            <div className="flex flex-row items-center justify-between mt-6 ">
                <input 
                    type="text" 
                    val={add} 
                    onChange={handleInputChange}
                    className="border-blues-600 border-2 my-1 pl-4 py-1 w-1/2 text-gray-500 text-sm "
                />
                <div className=" relative bg-blues-700 w-[3%] aspect-square overflow-hidden rounded-sm " onClick={handleAddFeature}>
                    <AddOutlinedIcon className="add-item w-[90%] aspect-square overflow-hidden"/>
                </div>
            </div>
        </div>
    );
}