import {startShell} from "./shell/index.js";
import {logError} from "./utils.js";
import {ERROR_MESSAGES} from "./constants.js";
import {exit} from 'node:process';


export const main = async () => {
    try {
        await startShell()
    } catch (error) {
        logError(`${ERROR_MESSAGES.FM_OPERATION_FAILED}, ${error.message}`)
        exit(1)
    }
}

await main()