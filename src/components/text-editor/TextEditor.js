import {React, useState} from 'react'
import { EditorState, convertToRaw, ContentState, convertFromHTML} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { TextareaAutosize } from '@mui/material';
import axios from '../../api/axios';

export default function TextEditor({uploadUrl, value, setValue}){
    const editorState = EditorState.createWithContent(
        ContentState.createFromBlockArray(
          convertFromHTML(value)
    ));
    const [description, setDescription] = useState(editorState);
    
    const onEditorStateChange = (editorState) => {
        setDescription(editorState);
    }
    // const uploadUrl = "/admin/uploads/post-image";

    const uploadImageCallBack = (files) => {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('image', files);
            axios.post(uploadUrl, formData)
                .then((data) =>  {
                    resolve({data:{link: data.data.imagePath}})
                })
                .catch((error) => {
                    reject(error);
                }) 
        });
    }

    return (
        <>
            <Editor
                editorState={description}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
                toolbar={{
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                    image: {
                        uploadEnabled: true,
                        uploadCallback: uploadImageCallBack,
                        previewImage: true,
                        alt: { present: false, mandatory: false },
                        defaultSize: {
                            height: 'auto',
                            width: 'auto',
                        },
                    },
                }}
            />
            <TextareaAutosize 
                style={{display:'none'}} 
                disabled 
                ref={(val) => {setValue(val)}} 
                value={draftToHtml(convertToRaw(description.getCurrentContent())) } 
            />
        </>
    )
}
