import * as React from 'react';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { alpha, styled } from '@mui/material/styles';
import "./Date.css";

const CustomDesktopDatePicker = styled(DesktopDatePicker)({
    '& .MuiDateCalendar-root': {
        color: '#4c25b9',
        backgroundColor: 'black',

    },
    '.css-1wy8uaa-MuiButtonBase-root-MuiPickersDay-root .Mui-selected': {
        color: '#4c25b9 !important'  ,
        border: '5px solid red !important',
        backgroundColor: '#4c25b9 !important',
    },
    '& .MuiPickersDay-root': {
        color: '#4c25b9 !important'  ,
        border: '5px solid red !important',
        backgroundColor: '#4c25b9 !important',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: '3px solid #4c25b9 !important',
    }
})

export default function MyDate({value, onChange, ...props}) {
  const [cleared, setCleared] = React.useState(false);

  React.useEffect(() => {
    if (cleared) {
      const timeout = setTimeout(() => {
        setCleared(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [cleared]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          margin: '10px 0px',
        }}
      >
        <DemoItem>
          <CustomDesktopDatePicker
            className="w-[200px] md:w-[250px] xl:w-[300px]"
            slotProps={{
              field: { clearable: true, onClear: () => setCleared(true) },
            }}
            value={value}
            onChange={onChange}
            size={props.size}
            {...props}
          />
        </DemoItem>
      </Box>
    </LocalizationProvider>
  );
}
