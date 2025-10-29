import {fileURLToPath} from "node:url";
import {dirname, resolve} from "node:path";
import {access} from "node:fs/promises";
import {commands} from "./constants.js";
import {parseArgs} from 'node:util'

export const throwError = ({message, cause}) => {
    throw new Error(`${message} ${cause?.message}`)
}

export const getPathData = (path) => {
    const fileName = fileURLToPath(path);
    const dirName = dirname(fileName)
    return {dirName, fileName}
}

export const isFileExists = ({path}) => access(path).then(() => true, () => false)

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

export const printCurrentDir = (currentPath) => {
    console.log(`You are currently in ${currentPath}`);
};

export const parsePath = (inputPath, currentPath) => {
    return resolve(currentPath, inputPath);
};

export const isRoot = (path) => {
    return dirname(path) === path;
};