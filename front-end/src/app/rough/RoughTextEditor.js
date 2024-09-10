import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react';
import { EditorState, convertFromHTML, ContentState} from 'draft-js';
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

export const TextEditorList = React.memo((props) => {
    const { data, pos, delSection, eraseAttribute, handleInputChange } = props;
    const items = data[pos]?.['items'] || [];

    return (
        <div>
            {items.map((item, ind) => (
                <div key={ind} className="flex flex-row items-center justify-between">
                    <div className="flex flex-col w-full bg-blue-400 my-8 p-6 rounded-lg segment text-white">
                        {Object.keys(item).map((attribute) => (
                            <div key={attribute} className="flex flex-row items-center justify-between w-full">
                                <TextEditor
                                    data={item[attribute]['main']}
                                    currData={data}
                                    pos={pos}
                                    ind={ind}
                                    ele={attribute}
                                    handleInputChange={handleInputChange}
                                />
                                <div
                                    className="relative section-del bg-[#393838] rounded-full w-[5%] aspect-square flex items-center justify-center cursor-pointer"
                                    onClick={() => eraseAttribute(pos, ind, attribute)}
                                >
                                    <div className="w-full h-full"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div onClick={() => delSection(pos, ind)} className="ml-4 cursor-pointer">
                        del
                    </div>
                </div>
            ))}
        </div>
    );
});