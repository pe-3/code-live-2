import $bus from '../events';
import { socket } from '../index'
import parseChange from './edit';

export default class Code {
    code = {
        html: '',
        css: '',
        js: ''
    };
    type = 'html';
    // 控制权
    control = false;
    // 防抖操作
    timer = null;

    getControl = () => {
        this.control = true;
        $bus.emit('editable', true);
    }

    delControl = () => {
        this.control = false;
        $bus.emit('editable', false);
    }

    editCode = (val, type = this.type) => {
        this.code[type] = val;
        $bus.emit('editcode', val);
    }

    getChanges(value, viewUpdate) {
        const { changedRanges } = viewUpdate;
        const changes = [];
        changedRanges.forEach(changeRange => {
            const { fromB, toB } = changeRange;
            changes.push({
                insertStr: value.slice(fromB, toB),
                changeRange,
            });
        });
        return changes;
    }

    changeHandler = (value, viewUpdate) => {
        if (!this.control) return;
        this.editCode(value);
        // 传给后台的迷你对象
        const change = {
            changes: this.getChanges(value, viewUpdate),
            type: this.type
        };
        socket.send(JSON.stringify(change));
    }

    parseMsg(data, setCode) {
        const { code, type, changeType, control } = data;
        if (code) {
            this.code = code;
            this.setType(type);
        } else if (changeType) {
            this.setType(changeType);
        } else if (control) {
            this.delControl();
        }
        else {
            this.editCode(parseChange(this.code[type], data), type);
        }
        setCode(this.code[type]);
    }

    msgHandler = (data, setCode) => {
        this.control && this.delControl();
        this.parseMsg(JSON.parse(data), setCode)
    }

    changeType = (type) => {
        this.type = type;
    }

    getType = () => {
        return this.type;
    }

    getCurCode = () => {
        return this.code[this.type];
    }

    getCode = (type) => {
        return this.code[type];
    }

    typeevents = [];

    addEvents = (func) => {
        this.typeevents.push(func);
    }

    removeEvents = (func) => {
        this.typeevents = this.typeevents.filter((item) => item !== func);
    }

    setType = (type) => {
        this.typeevents.forEach((func) => func(type));
    }

    sendType = () => {
        if (!this.control) return;
        const { type } = this;
        socket.send(JSON.stringify({ changeType: type }));
    }
}

const codeins = new Code();

export { codeins }