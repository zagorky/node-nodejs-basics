import {fileURLToPath} from "node:url";
import {dirname} from "node:path";


export const logger = ({message, cause, type = 'log'}) => {
    const errorMessage = `${message}: ${cause?.message}`

    if (type === 'error') {
        throw new Error(errorMessage)
    } else {
        console[type](message)
    }
}

export const getPathData = (path) => {
    const fileName = fileURLToPath(path);
    const dirName = dirname(fileName)
    return {dirName, fileName}
}