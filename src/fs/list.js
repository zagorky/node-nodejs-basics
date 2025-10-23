import {getPathData, isFileExists, logger, throwError} from "../utils.js";
import {join} from "node:path";
import {ERROR_MESSAGES, filesDirectory} from "../constants.js";
import {readdir} from "node:fs/promises";

const {dirName} = getPathData(import.meta.url)
const filesFolderPath = join(dirName, filesDirectory)

const list = async () => {

    isFileExists({path: filesFolderPath}).catch((error) => throwError({
        message: ERROR_MESSAGES.FS_OPERATION_FAILED,
        cause: error
    }))

    readdir(filesFolderPath, {withFileTypes: true}).then((files) => files.map(dirent => logger({message: dirent.name})), (error) => throwError({
        message: ERROR_MESSAGES.FS_OPERATION_FAILED,
        cause: error,
    }))
};

await list();
