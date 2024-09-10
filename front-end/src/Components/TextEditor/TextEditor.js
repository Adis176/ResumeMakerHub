import dynamic from 'next/dynamic'

const TextEditor = dynamic(() => import('./TextEditorComponent'), { ssr: false })

export default TextEditor;