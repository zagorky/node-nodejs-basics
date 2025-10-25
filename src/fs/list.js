import {getPathData, isFileExists, logger, throwError} from "../utils.js";
import {join} from "node:path";
import {ERROR_MESSAGES, filesDirectory} from "../constants.js";
import {readdir} from "node:fs/promises";

const {dirName} = getPathData(import.meta.url)
const filesFolderPath = join(dirName, filesDirectory)

const list = async () => {
    const folderExists = await isFileExists({path: filesFolderPath});
    if (!folderExists) {
        throwError({
            message: ERROR_MESSAGES.FS_OPERATION_FAILED,
            cause: new Error('Files folder does not exist')
        });
    }

    readdir(filesFolderPath, {withFileTypes: true})
        .then((files) => logger({message: files.map(dirent => dirent.name)}),
            (error) => throwError({
                message: ERROR_MESSAGES.FS_OPERATION_FAILED,
                cause: error,
            }))
};

await list();
