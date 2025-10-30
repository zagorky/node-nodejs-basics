import {dirname, resolve} from "node:path";
import {commands} from "./constants.js";
import {parseArgs, styleText} from 'node:util'
import {cwd} from 'node:process';


export const throwError = ({message, cause}) => {
    throw new Error(`${message} ${cause?.message}`)
}

export const completer = (command) => {
    const hits = commands.filter(cmd => cmd.startsWith(command));
    return [hits.length ? hits : commands, command];

}

export const parseUsername = () => {
    const {values} = parseArgs({
        options: {
            username: {
                type: 'string',
            },
        },
        strict: false,
    })

    return values.username ?? 'Anonymous'
}

export const printCurrentDir = () => {
    console.log(styleText('yellowBright', `You are currently in ${cwd()}`));
};

export const parsePath = (inputPath) => {
    return resolve(cwd(), inputPath);
};

export const isRoot = (path) => {
    return dirname(path) === path;
};

export const logError = (error) => console.log(styleText('red', error));

export const logSuccess = (input) => console.log(styleText('cyanBright', input));
