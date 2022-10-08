// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const webscoket = require('@fastify/websocket');
// 注册服务
fastify.register(webscoket);

// 创建code链接对象实例
const SocketCnecs = require('./code_socket')
const cnecIns = new SocketCnecs();
// 注册socket服务
fastify.register(async function (fastify) {
    fastify.get(
        '/socket',
        { websocket: true },
        cnecIns.connectHandler
    );
});

fastify.get('/page', async (request, reply) => {
    reply.header('Content-Type', 'text/html; charset=utf-8');
    const page = ReadFile(__dirname + '/page.html');
    console.log(page);
    reply.send(page)
})

// 拿到ip创建服务器
const { ip } = require('./ip.js');
// 启动服务器
(async () => {
    try {
        await fastify.listen({
            host: ip,
            port: 8080
        });
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})();

// 启动服务后给客户端生成ip.json供前端使用
const { writeFile, ReadFile } = require('./file');
(async function () {
    try {
        const ipstr = JSON.stringify({ ip });
        writeFile('./src/ip.json', ipstr);
    } catch (err) {
        console.warn(err);
    }
})()