import dynamic from 'next/dynamic'
import React from 'react';
import MyButton from '../Button/Button';

const TextEditor = dynamic(() => import('../TextEditor/TextEditor'), { ssr: false })

export const TextEditorList = React.memo((props) => {
    const { data, pos, delSection, eraseAttribute, handleInputChange } = props;
    const items = data[pos]?.['items'] || [];

    return (
        <div>
            {items.map((item, ind) => (
                <div key={ind} className="flex flex-row items-center justify-between">
                    <div className="flex flex-col w-full gradient-bg my-8 p-6 rounded-lg segment text-white">
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
                    {/* <MyButton size='md' color='btn3' text='DEL' onClick={delSection(pos, ind)} className='rounded-full' >
                    </MyButton> */}
                    {/* <div onClick={() => delSection(pos, ind)} className="ml-4 cursor-pointer">
                        del
                    </div> */}
                </div>
            ))}
        </div>
    );
});

export default TextEditorList;