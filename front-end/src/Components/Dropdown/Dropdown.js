import React from "react";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import "./Dropdown.css";

const CustomDropdown = styled(TextField)(({ theme }) => ({
    '& .MuiInputLabel-root': {
        color: '#4c25b9 !important',
    },
    '& .MuiFormHelperText-root': {
        color: '#4c25b9 !important',
    },
    '& .MuiFilledInput-input': {
        color: '#000000 !important'
    },
    '& .MuiSelectNative-input': {
        color: '#000000'
    },
    '& .MuiFilledInput-root': {
        borderBottom: '2px solid #4c25b9 !important',
        color: '#000000'
    },
    '& .MuiFilledInput-root::after': {
        borderBottom: '0px solid transparent !important',
    },
}));

const sizes = {
    'md': 'w-1/2 my-4',
    'lg': 'w-2/3 my-6',
    'xl': 'w-full my-8'
};

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
    backgroundColor: '#A187EA',
    color: '#000000',
    margin: '2px 0px',

    '&.Mui-selected': {
        backgroundColor: '#3a1b95 !important',
        color: '#ffffff'
    },
    '&:hover': {
        backgroundColor: '#3a1b95',
        color: '#ffffff'
    },
}));

export default function MyDropdown(props) {
    const currSize = sizes[props.size] || sizes['md']; // Default to 'md' if size is not provided

    return (
        <CustomDropdown
            id="filled-select-font"
            select
            label={props.label || 'Select Font'}
            defaultValue={props.default || 'cmr'}
            variant="filled"
            className={`${currSize} relative`}
            // MenuProps={{
            //     PaperProps: {
            //         style: {
            //             maxHeight: '200px', // Adjust this value as needed
            //             width: 'auto',
            //             backgroundColor: '#4c25b9',
            //         },
            //     },
            //     anchorOrigin: {
            //         vertical: 'bottom',
            //         horizontal: 'left',
            //     },
            //     transformOrigin: {
            //         vertical: 'top',
            //         horizontal: 'left',
            //     },
            //     getContentAnchorEl: null,
            // }}
        >
            {props.font.map((option, index) => (
                <CustomMenuItem key={index} value={option.code} onClick={() => props.handleFont(index)}>
                    {option.name}
                </CustomMenuItem>
            ))}
        </CustomDropdown>
    );
}