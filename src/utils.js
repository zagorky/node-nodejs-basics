import {fileURLToPath} from "node:url";
import {dirname} from "node:path";


export const logger = ({message, type = 'log'}) => {
    console[type](message)
}

export const throwError = ({message, cause}) => {
    throw new Error(`${message} ${cause?.message}`)
}

export const getPathData = (path) => {
    const fileName = fileURLToPath(path);
    const dirName = dirname(fileName)
    return {dirName, fileName}
}