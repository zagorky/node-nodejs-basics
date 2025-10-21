import {fileURLToPath} from "node:url";
import {dirname} from "node:path";
import {access, cp, mkdir, readdir, rename, rm} from "node:fs/promises";

export const throwError = ({message, cause}) => {
    throw new Error(`${message} ${cause?.message}`)
}

export const getPathData = (path) => {
    const fileName = fileURLToPath(path);
    const dirName = dirname(fileName)
    return {dirName, fileName}
}

export const copyDirectory = ({source, destination}) => cp(source, destination, {
    recursive: true,
    errorOnExist: true,
    force: false
})

export const renameFile = ({source, destination}) => rename(source, destination)

export const isFileExists = ({path}) => access(path).then(() => true, () => false)

export const logger = ({message, type = 'log'}) => {
    console[type](message)
}
export const removeFiles = ({directory}) => rm(directory, {recursive: true})

export const createDirectory = ({directory}) => mkdir(directory, {recursive: true})

export const readDirectory = ({directory}) => readdir(directory, {withFileTypes: true})
