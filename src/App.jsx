import CodeEidtor from "./componets/CodeEidtor";
import ip from './ip.json'
import { useEffect } from 'react'
import Console from "./componets/Console";
import './assets/font/font_sb78zxrnymc/iconfont.css'
import './assets/font/font_2k6cocrx8eu/iconfont.css'
import $bus from "./events";
function App() {
  let iframe = null;

  useEffect(() => {
    const listener = () => {
      if (!iframe) return;
      console.log(iframe);
      iframe.contentWindow.getConsole({
        log: function (data) {
          if (typeof data !== 'string') {
            data = data.toString();
          }
          $bus.emit('add-msg', { type: 'info', text: data });
          console.log(data);
        },
        warn: function (err) {
          $bus.emit('add-msg', { type: 'warn', text: err.toString() });
          console.warn(err);
        },
        clear: function () {
          $bus.emit('clear-msg');
          console.clear();
        }
      });
    }
    iframe.addEventListener('load', listener)
    return () => {
      iframe.removeEventListener('load', listener)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="app">
      <CodeEidtor />
      <div className="right">
        <iframe ref={(ref) => { iframe = ref }} title='code_page' src={`http://${ip.ip}:8080/page`} frameBorder="0" className="code_page">
        </iframe>
        <Console />
      </div>
    </div>
  );
}

export default App;

document.domain = window.location.hostname
