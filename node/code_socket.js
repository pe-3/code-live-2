const { getStrBuffer } = require('./file')
const { parseChange, printCode } = require('./code_edit');
class SocketCnecs {
    // 链接组
    cnecs = [];
    // 网页代码组
    code = {
        html: '',
        css: '',
        js: ''
    };

    // 上次观看的文件类型
    type = 'html';
    // 初始化代码
    initCode() { }
    // 代码编辑
    editCode = (change) => {
        const { type, changeType, control } = change;
        if (changeType) {
            this.type = changeType;
            printCode(this.code[this.type], this.type + ' switch');
            return;
        }
        if(control){
            return;
        }
        this.code[type] = parseChange(this.code[type], change);
        printCode(this.code[type], type);
    }

    // 群发消息
    groupSend = (msg, thiscnec) => {
        this.cnecs.forEach((cnec) => cnec !== thiscnec && cnec.socket.send(msg));
    }
    // 消息控制器
    messageHandler = (message, thiscnec) => {
        const msg = getStrBuffer(message);
        const change = JSON.parse(msg);
        // 编辑服务器端代码
        this.editCode(change);
        // 转发修改
        this.groupSend(msg, thiscnec);
    };
    // 链接控制器
    connectHandler = (connection) => {
        // 第一次链接
        if (!this.cnecs.includes(connection)) {
            connection.socket.send(JSON.stringify({
                code: this.code,
                type: this.type
            }));
        }
        // 将链接放入组以备群发
        this.cnecs.push(connection);
        // 收到链接消息时
        connection.socket.on(
            'message',
            (message) => {
                this.messageHandler(message, connection);
            }
        );
    };
}

module.exports = SocketCnecs;