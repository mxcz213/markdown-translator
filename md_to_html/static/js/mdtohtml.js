/**
 * @file markdown 文件转化为 html 代码
 * @think 
 * 思路：
 * 1.将传入的文本按换行分成数组；
 * 2.按照规则一行一行转换，遇到无序列表中区段元素，就再往下看一行，直到匹配完为止
 * 3.没有匹配到的规则，直接输出单行内容
 */

 // 区块元素匹配的正则
const block = {
    // 标题
    titleReg: /^(\#{1,6}) (.+)/,
    codeReg: /.*\`(.+)\`.*/,
    boldReg: /.*\*\*(.+)\*\*.*/,
    ulReg: /^\+ (.+)/,
}

// 区段元素
const section = {

}

const handleTitle = (lines, cur) => {
    const [ , hash, content ] = block.titleReg.exec(lines[cur]);
    const tag = `h${hash.length}`;
    const html = `<${tag}>${content}</${tag}>`;
    return {
        index: cur + 1,
        html
    }
}

const handleUlList = (lines, cur) => {
    let next = cur;
    while(true){
        next++;
        if(!block.ulReg.test(lines[next])){
            break;
        }
    }
    //转译拿到的 N 行
    let htmls = [];
    for(let i = cur; i < next; i++){
        const li = lines[i];
        const result = block.ulReg.exec(li);
        const html = `<li>${result[1]}</li>`
        htmls.push(html);
    }
    // 首位加闭合标签
    htmls.unshift('<ul>');
    htmls.push('</ul>');
    return {
        index: next,
        html: htmls.join('\n')
    }
}

const singleLine = (line) => {
    return line.replace(block.codeReg, (match, code) => {
        // 单行代码
        return `<code>${code}</code>`
    }).replace(block.boldReg, (match, bold) => {
        // 单行加粗
        return `<b>${bold}</b>`
    });
}

const transToDocument = (lines) => {
    // 记录转译的当前行索引
    let cur = 0;

    // 存储转译每一行的 html 标签
    let htmls = [];

    // 循环转译每一行的 md 规则，如果 cur === length，跳出循环
    // 转译每一条 markdown 规则
    while(true){
        if(cur === lines.length){
            break;
        }

        // 当前行
        const line = lines[cur];

        // 处理标题
        if(block.titleReg.test(line)){
            const { index, html } = handleTitle(lines, cur);
            htmls.push(html);
            cur = index;
            continue;
        }

        // 转译无序列表
        if(block.ulReg.test(line)){
            const { index, html } = handleUlList(lines, cur);
            htmls.push(html);
            cur = index;
            continue;
        }

        // 转译单行
        const html = singleLine(line);
        htmls.push(html);
        cur++;
    }

    return htmls.join('\n');
}

const transCompiler = (source) => {
    const lines = source.split('\n');
    // 返回转译过的 html 标签
    return transToDocument(lines);
}

const MdtoHtml = (source) => {
    // 判断参数类型
    if(typeof source === 'undefined' || source === null){
        throw new Error('input parameter is udefined or null')
    }
    if(typeof source !== 'string'){
        throw new Error(`input parameter type is ${Object.prototype.toString.call(source)}, not expected string`)
    }
    // 处理所有的 \n, \t, \r 为 \n
    // markdown 转译器
    return transCompiler(source.replace(/\r\n | \r/, '\n'));
}

window.MdtoHtml = MdtoHtml;