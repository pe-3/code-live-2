import { useEffect, useState } from "react";
import { codeins } from "../code-edit/code";
import { parseLang } from '../code-edit/langs'

type File = 'html' | 'css' | 'js';
export default function MyMenu(props: { setLang: any, setCode: any, getControl: () => void, control: boolean }) {
    const menus: File[] = [
        'html',
        'css',
        'js'
    ]
    const [cur, setcur] = useState<File>(codeins.getType() as File);
    const switchHanlder = (item: File) => {
        return new Promise((resolve) => {
            setcur(item);
            // 切换代码防重
            codeins.delControl();
            codeins.changeType(item);
            props.setLang(parseLang(item));
            setTimeout(() => {
                props.setCode(codeins.getCode(item));
                setTimeout(() => {
                    resolve('get control');
                });
            });
        })
    }

    useEffect(() => {
        codeins.addEvents(switchHanlder);
        return () => {
            codeins.removeEvents(switchHanlder);
        }
    })
    
    return (
        <div className='my-menu'>
            {menus.map((item) => {
                return <button
                    key={item}
                    className={'menu-item ' + (cur === item ? 'menu-item-active' : '')}
                    onClick={() => {
                        if (codeins.type === item || !codeins.control) return;
                        switchHanlder(item).then(() => { codeins.getControl(); codeins.sendType(); });
                    }}
                >
                    index.{item}
                </button>
            })}
            <input
                type="text"
                placeholder='insert your website'
                className='menu-input'
            />
            <button
                className={"menu-item " + (props.control ? 'menu-item-active' : '')}
                onClick={props.getControl}>
                {props.control ? 'controling...' : 'get control'}
            </button>
        </div>
    )
}
