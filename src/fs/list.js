import {getPathData, isFileExists, readDirectory, throwError} from "../utils.js";
import {join} from "node:path";
import {ERROR_MESSAGES, filesDirectory} from "../constants.js";

const {dirName} = getPathData(import.meta.url)
const filesFolderPath = join(dirName, filesDirectory)

const list = async () => {

    isFileExists({path: filesFolderPath}).catch((error) => throwError({
        message: ERROR_MESSAGES.FS_OPERATION_FAILED,
        cause: error
    }))

    readDirectory({directory: filesFolderPath}).then(console.log, (error) => throwError({
        message: ERROR_MESSAGES.FS_OPERATION_FAILED,
        cause: error,
    }))
};

await list();
