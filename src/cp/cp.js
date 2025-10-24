import {getPathData, throwError} from "../utils.js";
import {join} from "node:path";
import {fork} from "node:child_process";
import {ERROR_MESSAGES, filesDirectory} from "../constants.js";

const {dirName} = getPathData(import.meta.url);
const scriptPath = join(dirName, filesDirectory, 'script.js');

const spawnChildProcess = async (args) => {
    try {
        fork(scriptPath, args, {
            stdio: ['inherit', 'inherit', 'inherit', 'ipc']
        });
    } catch (error) {
        throwError({
            message: ERROR_MESSAGES.CP_OPERATION_FAILED,
            cause: error,
        });
    }
};

// Put your arguments in function call to test this functionality
await spawnChildProcess(['arg1', 'arg2', 'arg3']);