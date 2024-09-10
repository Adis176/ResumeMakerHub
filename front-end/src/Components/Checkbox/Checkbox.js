import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { alpha, styled } from '@mui/material/styles';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const CustomCheckbox = styled(Checkbox)(({ theme }) => ({
  color: 'black',
  '&.Mui-checked': {
    color: 'black',
  },
  '&:hover': {
    backgroundColor: 'transparent',
  },
  '&.Mui-checked:hover': {
    backgroundColor: 'transparent',
  },
  '& .MuiTouchRipple-root': {
    backgroundColor: 'transparent !important',
  },
}));

export default function MyCheckbox(props) {
  return (
    <div className={`flex flex-row items-center justify-between ${props.className} h-full p-4`}>
      <CustomCheckbox
        {...label}
        defaultChecked
        disableRipple
        onClick={props.onClick}
      />
      <span className='font-bold'>{props.label ? props.label : ""} </span>
    </div>
  );
}
