'use client'
import React, { useState, useEffect } from 'react';
import { EditorState, Modifier, RichUtils } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';

import './format.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function page() {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const [convertedContent, setConvertedContent] = useState(null);

    useEffect(() => {
        let html = convertToHTML(editorState.getCurrentContent());
        setConvertedContent(html);
        console.log(html);
    }, [editorState]);

    const handleLinkInput = (e) => {
        e.preventDefault();
        const urlValue = prompt('Enter URL:');
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'LINK',
            'IMMUTABLE',
            { url: urlValue }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        
        setEditorState(RichUtils.toggleLink(
            newEditorState,
            newEditorState.getSelection(),
            entityKey
        ));
    };

    const linkComponent = () => {
        return (
            <div style={{ display: 'inline-block' }}>
                <button 
                    onClick={handleLinkInput} 
                    style={{ backgroundColor: 'black', color: 'white', border: 'none', padding: '5px' }}
                >
                    Add Link
                </button>
            </div>
        );
    };

    return (
        <div className="editor-container">
            <header className="editor-container-header">
                Rich Text Editor Example
            </header>
            <Editor
                editorState={editorState}
                onEditorStateChange={setEditorState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                toolbar={{
                    options: ['inline', 'link', 'remove', 'history'],
                    inline: {
                        inDropdown: false,
                        className: undefined,
                        component: undefined,
                        dropdownClassName: undefined,
                        options: ['bold', 'italic', 'underline'],
                    },
                    link: {
                        inDropdown: false,
                        className: undefined,
                        component: linkComponent,
                        popupClassName: undefined,
                        dropdownClassName: undefined,
                        showOpenOptionOnHover: true,
                        defaultTargetOption: '_self',
                        options: ['link', 'unlink'],
                    },
                }}
            />
            <div dangerouslySetInnerHTML={{__html: convertedContent}} />
        </div>
    );
}

// reference: https://stackoverflow.com/questions/62321505/how-to-add-link-in-draft-js-no-plugins
