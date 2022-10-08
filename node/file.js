const fs = require('fs');

function writeFile(url, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(
            url,
            data,
            (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(data);
            }
        );
    })
}

function ReadFile(url) {
    let res = '';
    try {
        res = fs.readFileSync(url, { encoding: 'utf-8' });
    } catch (err) {
        console.warn(err);
    }
    return res;
}

function getStrBuffer(buffer) {
    const bufStr = Buffer.from(buffer);
    return bufStr.toString();
}

module.exports = {
    writeFile,
    ReadFile,
    getStrBuffer
}