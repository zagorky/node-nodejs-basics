import {createInterface} from 'node:readline/promises';
import {completer, logError, parseUsername, printCurrentDir} from "../utils.js";
import {chdir, exit, stdin, stdout} from 'node:process';
import {homedir} from 'node:os';
import {styleText} from 'node:util';
import {ERROR_MESSAGES} from '../constants.js';
import {cd, ls, up} from "../commands/navigation.js";
import {hash} from "../commands/hash.js";
import {compress, decompress} from "../commands/zip.js";
import {add, cat, cp, mkdir, mv, rm, rn} from "../commands/file.js";
import {os} from "../commands/os.js";


export const startShell = async () => {
    const rl = createInterface({
        input: stdin,
        output: stdout,
        completer
    });
    chdir(homedir());
    const username = parseUsername();

    console.log(styleText('cyan', `Welcome to the File Manager, ${username}`));
    console.log(styleText(['italic', 'dim', 'magentaBright'], `🧚🏼  Tap TAB to autocomplete commands`));
    printCurrentDir();
    rl.prompt();

    const commandHandlers = {
        up,
        cd: async (args) => await cd(args),
        ls,
        cat: async (args) => await cat(args),
        add: async (args) => await add(args),
        mkdir: async (args) => await mkdir(args),
        rn: async (args) => await rn(args),
        cp: async (args) => await cp(args),
        mv: async (args) => await mv(args),
        rm: async (args) => await rm(args),
        os: async (args) => await os(args),
        hash: async (args) => hash(args),
        compress: async (args) => await compress(args),
        decompress: async (args) => await decompress(args),
        '.exit': async () => {
            rl.close();
            exit(0);
        },
    };

    rl.on('line', async (line) => {
        const [cmd, ...args] = line.trim().split(' ');
        try {
            const handler = commandHandlers[cmd];
            if (handler) {
                rl.pause();
                console.log(styleText('blueBright', `⏳ Executing command: ${cmd} ${args.join(' ')}`));
                await handler(args);
                console.log(styleText('magenta', '⚡️ Command executed successfully'));
            } else if (cmd !== '') {
                logError(ERROR_MESSAGES.INVALID_INPUT)
            }
        } catch (error) {
            logError(error.message.includes('ENOENT') ? ERROR_MESSAGES.OPERATION_FAILED : error.message);
        }
        rl.resume();
        printCurrentDir();
        rl.prompt();
    });

    rl.on('close', () => {
        console.log(styleText('magentaBright', `Thank you for using File Manager, ${username}, goodbye!`));
        exit(0);
    });
};
