import { sublime } from '@uiw/codemirror-theme-sublime';
import { useState, useEffect} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import ScrollBar from "./ScrollBar";
import { codeins } from '../code-edit/code';
import { socket } from '../index'
import MyMenu from './MyMenu';
import { parseLang } from '../code-edit/langs';
import $bus from '../events';
export default function CodeEidtor() {
    // 当前展示的代码
    const [code, setCode] = useState('');
    // 当前语言
    const [curLang, setLang] = useState(parseLang('html'));
    // 绑定监听
    const [editable, setEditAble] = useState(codeins.control);
    useEffect(() => {
        const hanlder = (event) => {
            const data = event.data;
            codeins.msgHandler(data, setCode);
        }

        $bus.addListener('editcode', setCode);
        $bus.addListener('editable', setEditAble);
        socket.addEventListener('message', hanlder);
        return () => {
            $bus.removeListener('editable', setEditAble);
            $bus.removeListener('editcode', setCode);
            socket.removeEventListener('message', hanlder);
        };
    }, []);
    return (
        <div className='left'>
            <MyMenu setLang={setLang} setCode={setCode} getControl={() => {
                if (codeins.control) return;
                codeins.getControl();
                socket.send(JSON.stringify({ control: true }));
            }} control={editable} />
            <ScrollBar
                className='editor-container'
            >
                <CodeMirror
                    value={code}
                    minHeight='100vh'
                    maxWidth='50vw'
                    theme={sublime}
                    placeholder='Please enter your code.'
                    extensions={[curLang]}
                    onChange={codeins.changeHandler}
                    editable={editable}
                />
            </ScrollBar >
        </div>
    )
}

