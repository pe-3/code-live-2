function parseChange(previous, change) {
    if (typeof previous !== 'string') {
        throw new Error('previous should be a string');
    }
    // 1.解析change对象
    const { changes } = change;
    // 2.根据解析的内容分割重组字符串
    const codePartArr = [];
    const { changeRange: { fromA: sFromA } } = changes[0];
    codePartArr.push(previous.slice(0, sFromA));

    for (let i = 0; i < changes.length - 1; i++) {
        const { changeRange: { toA: cToA }, insertStr } = changes[i];
        const { changeRange: { fromA: nFromA } } = changes[i + 1];
        codePartArr.push(insertStr);
        codePartArr.push(previous.slice(cToA, nFromA));
    }

    const { changeRange: { toA: lToA }, insertStr } = changes[changes.length - 1];
    codePartArr.push(insertStr);
    codePartArr.push(previous.slice(lToA));
    console.log(codePartArr)
    return codePartArr.join('');
}

function printCode(code, type) {
    console.log(`--- ${type} code start ---\n`, `${code}\n`, `--- ${type} code end   ---`);
}

module.exports = {
    parseChange,
    printCode
}