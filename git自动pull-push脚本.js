/**
 * 由于网络问题，每次从github推/拉代码经常挂掉
 * 需要不断手动重新执行，所以打算用此脚本来自动完成
 * 
 * spawn，是nodejs用来控制命令行的对象 https://nodejs.org/api/child_process.html#child-process
 * commander，是三方库，用来解析node命令的参数，也可以用来加一些命令的提示
 * colors，是三方库，用来快速生成带有颜色的console.log()
 *  -注意%c后面加"color..."字符串的写法只能在浏览器生效
*/

const {spawn} = require('node:child_process');
const {program} = require('commander');
require('colors')

const gitCommand = (isPull) => new Promise((resolve) => {
    const command = 'git'
    const commandOpt = isPull ? 'pull' : 'push'
    const child = spawn(command, [commandOpt])
    console.log('执行：'.green, command, commandOpt);
    child.stdout.on('data', data => {
        console.log(`stdout: ${data}`.green);
    })
    child.stderr.on('data', data => {
        console.log(`stderr: ${data}`.red);
    })
    child.on('close', code => {
        // 0成功 1或其他失败
        console.log('code', code);
        resolve(code)
    })
})

const excuteUpdate = async (isPull) => {
    let code = 1
    while (code) {
        code = await gitCommand(isPull)
        // 间隔1s执行下一次
        await new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, 1000);
        })
    }
    console.log('已完成!'.green);
}

program
    .option('--push')
    .option('--pull') // 默认执行

program.parse()

const options = program.opts()

excuteUpdate(!options.push)
