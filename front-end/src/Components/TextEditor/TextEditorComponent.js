import React, { useState, useEffect } from 'react';
import { EditorState, convertFromHTML, ContentState} from 'draft-js';
import { convertToHTML } from 'draft-convert';
import { Editor } from 'react-draft-wysiwyg';

import './TextEditor.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const TextEditorComponent = (props) => {
    let currData = props.currData;
    let pos = props.pos;
    let ind  = props.ind;
    let ele = props.ele;

    const [editorState, setEditorState] = useState(() => {
        const initialContent = `<p>${props.data}</p>`;
        const blocksFromHTML = convertFromHTML(initialContent);
        const contentState = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
        );
        return EditorState.createWithContent(contentState);
    });

    const [convertedContent, setConvertedContent] = useState(null);

    useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
        const selectionState = editorState.getSelection();
        const anchorKey = selectionState.getAnchorKey();
        const currentContent = editorState.getCurrentContent();
        const currentContentBlock = currentContent.getBlockForKey(anchorKey);
        const selectedText = currentContentBlock.getText().slice();
        props.handleInputChange(pos, ind, ele, selectedText, html);
        console.log("html form: ", html, typeof(html));
    }, [editorState]);

    return (
        <div className="editor-container">
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

export default TextEditorComponent;