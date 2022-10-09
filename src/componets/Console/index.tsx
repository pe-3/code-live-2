import { Fragment, useEffect, useState } from 'react'
import $bus from '../../events';
import ScrollBar from '../ScrollBar';
import './index.css'
export default function Console() {
    const [console, setConsole] = useState(false);
    const [msgs, setMsgs] = useState<{ text: string, type: string }[]>([]);
    useEffect(() => {
        const listener = (msg: { text: string, type: string }) => {
            setMsgs((msgs) => [msg, ...msgs]);
        }
        const clear = () => {
            setMsgs([]);
        }
        $bus.addListener('add-msg', listener);
        $bus.addListener('clear-msg', clear);
        return () => {
            $bus.removeListener('add-msg', listener);
            $bus.addListener('clear-msg', clear);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Fragment>
            <div className={"console " + (console ? 'console-show' : '')}>
                <div className="console-top">
                    <span>Output</span>
                    <span className="iconfont icon-close" onClick={() => { setConsole(false) }}></span>
                </div>
                <ScrollBar className="console-msgs">
                    {msgs.map((item, key) => {
                        return (<p className={`console-msg console-${item.type}`} key={key}>
                            {key === 0 ? (<span className='symbol'></span>) : ''}{item.text}
                        </p>)
                    })}
                </ScrollBar>
            </div>
            <div className='console-bar'>
                <div className="console-btn" onClick={() => { setConsole(!console) }}>
                    <span className="iconfont icon-error console-icon">0</span>
                    <span className="iconfont icon-warn console-icon">0</span>
                </div>
                <div className="console-right-icons">
                    <span className="iconfont icon-github console-icon" onClick={() => { window.open("https://github.com/pe-3/code-live-2", '_blank') }}></span>
                    {/* <span className="iconfont icon-bell console-icon"></span> */}
                    {/* <span className="iconfont icon-set console-icon"></span> */}
                </div>
            </div>
        </Fragment >
    )
}
