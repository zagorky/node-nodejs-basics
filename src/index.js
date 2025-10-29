import {startShell} from "./shell/index.js";
import {throwError} from "./utils.js";
import {ERROR_MESSAGES} from "./constants.js";
import {exit} from 'node:process';


export const main = async () => {
    try {
        await startShell()
    } catch (error) {
        throwError({message: ERROR_MESSAGES.FM_OPERATION_FAILED, cause: error})
        exit(1)
    }
}

await main()