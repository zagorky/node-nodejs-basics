import {getPathData, isFileExists, logger, readDirectory, throwError} from "../utils.js";
import {join} from "node:path";
import {ERROR_MESSAGES, filesDirectory} from "../constants.js";

const {dirName} = getPathData(import.meta.url)
const filesFolderPath = join(dirName, filesDirectory)

const list = async () => {

    isFileExists({path: filesFolderPath}).catch((error) => throwError({
        message: ERROR_MESSAGES.FS_OPERATION_FAILED,
        cause: error
    }))

    readDirectory({directory: filesFolderPath}).then((files) => files.map(dirent => logger({message: dirent.name})), (error) => throwError({
        message: ERROR_MESSAGES.FS_OPERATION_FAILED,
        cause: error,
    }))
};

await list();
