import {getPathData, removeFiles, throwError} from "../utils.js";
import {join} from "node:path";
import {ERROR_MESSAGES, filesDirectory} from "../constants.js";

const {dirName} = getPathData(import.meta.url);
const fileToRemovePath = join(dirName, filesDirectory, 'fileToRemove.txt')

const remove = async () => {
    removeFiles({directory: fileToRemovePath}).catch((error) => throwError({
        message: ERROR_MESSAGES.FS_OPERATION_FAILED,
        cause: error
    }))
};

await remove();
