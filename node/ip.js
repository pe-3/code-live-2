const os = require('os');
const getIPAddress = function () {
    const ifaces = os.networkInterfaces();
    let ip = '';
    for (let dev in ifaces) {
        ifaces[dev].forEach(
            // eslint-disable-next-line no-loop-func
            (details) => {
                if (ip === '' && details.family === 'IPv4' && !details.internal) {
                    ip = details.address;
                    return;
                }
            });
    }
    return ip || "127.0.0.1";
};

const ip = getIPAddress();

module.exports = {
    getIPAddress,
    ip
}