import {getPathData, throwError} from "../utils.js";
import {join} from "node:path";
import {ERROR_MESSAGES, filesDirectory} from "../constants.js";
import {rm} from "node:fs/promises";

const {dirName} = getPathData(import.meta.url);
const fileToRemovePath = join(dirName, filesDirectory, 'fileToRemove.txt')

const remove = async () => {
    rm(fileToRemovePath, {recursive: true}).catch((error) => throwError({
        message: ERROR_MESSAGES.FS_OPERATION_FAILED,
        cause: error
    }))
};

await remove();
