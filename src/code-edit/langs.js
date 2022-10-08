import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
const langjs = javascript({ typescript: true });
const langhtml = html({ autoCloseTags: true, matchClosingTags: true });
const langcss = css();

const langs = {
    langhtml,
    langcss,
    langjs
}

export default langs

export {
    langhtml,
    langcss,
    langjs
}

const parseLang = function (type) {
    if (type === 'html') {
        return langhtml;
    }
    if (type === 'css') {
        return langcss;
    }
    return langjs;
}

export {
    parseLang
}
