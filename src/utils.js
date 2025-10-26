import {fileURLToPath} from "node:url";
import {dirname} from "node:path";
import {access} from "node:fs/promises";

export const throwError = ({message, cause}) => {
    throw new Error(`${message} ${cause?.message}`)
}

export const getPathData = (path) => {
    const fileName = fileURLToPath(path);
    const dirName = dirname(fileName)
    return {dirName, fileName}
}

export const isFileExists = ({path}) => access(path).then(() => true, () => false)

export const logger = ({message, type = 'log'}) => {
    console[type](message)
}