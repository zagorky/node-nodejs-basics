import {resolve} from "node:path";
import {ERROR_MESSAGES} from "./constants.js";
import {parseArgs, styleText} from 'node:util'
import {cwd} from 'node:process';
import {access} from "node:fs/promises";

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

const isFileExists = ({path}) => access(path).then(() => true, () => false)

export const throwIfFilesDontExist = async ({src, dest, args}) => {
    const [isSrcExist, isDestExists] = await Promise.all([isFileExists({path: src}), isFileExists({path: dest})]);

    if (!isSrcExist || isDestExists) {
        throw new Error(`File ${args[0]} doesn't exist or file ${args[1]} already exists`)
    }
}

export const printCurrentDir = () => console.log(styleText('yellowBright', `You are currently in ${cwd()}`));

export const parsePath = (inputPath) => resolve(cwd(), inputPath);

export const parseSrcDestPaths = (args) => {
    const src = parsePath(args[0]);
    const dest = parsePath(args[1]);
    return {src, dest}
}

export const logError = (error) => console.log(styleText(['redBright', 'dim'], error));

export const logSuccess = (input) => console.log(styleText(['cyanBright', 'dim'], input));

export const validateArgs = (args, count = 1) => {
    if (!Array.isArray(args) || args.length !== count || args.some(a => !a)) {
        throw new Error(ERROR_MESSAGES.INVALID_INPUT);
    }
};