import React from 'react';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import "./Input.css";

const colors = {
    classic: {
        border: '#bbb',
        focus: 'black',
        color: 'white',
        label: '#ddd'
    },
    dark: {
        border: 'blues-600',
        focus: 'black',
        color: 'lightgrey',
        label: 'white'
    },
    light: {
        border: 'lightgrey',
        focus: 'grey',
        color: 'black',
        label: 'white'
    }
}

const sizes = {
    md: 'font-bold w-2/3 my-2 py-1 rounded-lg',
    xl: 'font-extrabold w-5/6 my-4 py-2 rounded-lg',
    xxl: 'font-extrabold my-4 py-2 w-full rounded-lg letter-2'
}

// CustomTextField component with styles based on props
const CustomTextField = styled(TextField)(({ theme, ...props }) => ({
    '& .MuiInputBase-root': {
        color: `${props.icolor} !important`, // change
        borderColor: `${props.iborder} !important`,
        '.MuiOutlinedInput-notchedOutline': {
            border: `2px solid ${props.iborder}`,
            color: `${props.icolor} !important`,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: `${props.ifocus}`, 
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: `${props.ifocus}`,
            color: `${props.ifocus} !important`,
            boxShadow: 'none !important',
        },
    },
    '& .MuiFormLabel-root': {
        color: `${props.ilabel} !important`,
    },
    '&.focus .MuiFormLabel-root': {
        color: `${props.ifocus} !important`,
    },
    '&.active .MuiFormLabel-root': {
        color: `${props.ilabel} !important`,
    },
    '.css-1eed5fa-MuiInputBase-root-MuiInput-root': {
        borderBottom: `1px solid ${props.iborder}`,
        color: 'black !important',
    },
    // 'input:-internal-autofill-selected': {
    //     backgroundColor: `transparent !important`,
    //     background: 'transparent !important'
    // },
    // '&.css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input:-webkit-autofill': {
    //     backgroundColor: 'transparent !important'
    // },
    // '& .MuiInputBase-input-MuiOutlinedInput-input': {
    //     backgroundColor: 'transparent !important'
    // },
    // '& -webkit-autofill': {
    //     backgroundColor:'red !important',
    //     '-webkit-box-shadow': '0 0 0 100px rgb(232, 240, 254) inset',
    //     '-webkit-text-fill-color': 'fieldtext',
    // },
}));

export default function MyInput(props) {
    var currColor = colors[props.color];
    var mt = props.mt || 'mt-4';
    var mr = props.mr || 'mt-0';
    var mb = props.mb || 'mt-4';
    var ml = props.ml || 'mt-0';
    var currSize = sizes[props.size] || sizes['xxl'];
    return (
        <CustomTextField
            choice={props.choice || 'base'}
            variant={props.variant || 'standard'}
            size={sizes[props.size] || sizes['xxl']}
            label={props.label}
            value={props.value}
            name={props.name || ""}
            required={props.required || false}
            onChange={props.onChange}
            type={props.type || 'text'}
            placeholder={props.placeholder}
            multiline={props.multiline}
            rows={props.multiline ? 4 : 1}
            iborder={currColor['border']}
            ifocus={currColor['focus']}
            icolor={currColor['color']}
            ilabel={currColor['label']}
            className={`myInput ${currSize} ${props.variant === "standard" ? 'bg-transparent' : ''} rounded-none ${mt} ${mr} ${mb} ${ml}} ${props.className} `}
        />
    );
}
