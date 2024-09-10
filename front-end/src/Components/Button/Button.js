import Button from '@mui/material/Button';
const sizes = {
    md: 'font-bold my-6 py-3 px-3 rounded-lg hover:shadow-md',
    xl: 'font-extrabold my-8 py-4 px-8 rounded-lg hover:shadow-lg',
    xxl: 'font-extrabold my-8 py-5 w-full rounded-lg hover:shadow-lg letter-2'
}

const colors = {
    btn1: 'bg-blues-300 hover:bg-blues-300 hover:shadow-blues-600',
    btn2: 'bg-blues-400 hover:bg-blues-400 hover:shadow-blues-700',
    btn3: 'bg-black hover:bg-black hover:shadow-blues-800',
    btn4: 'bg-blues-800 hover:bg-blues-900 hover:shadow-blues-700',
}

// values to be passed
// size
// color
// onClick function
// text
// type
export default function MyButton(props){
    const currSize = sizes[props.size] || sizes['md'];
    const currColor = colors[props.color] || colors['btn1'];
    return (
        <Button 
            variant="contained" 
            className={` 
                text-white flex flex-row 
                mx-auto 
                text-center align-center cursor-pointer ${currSize} ${currColor}
                ${props.className}
            `} 
            onClick={props.onClick}
            type={props.type}
        >
            {props.text}
        </Button>
    );
}