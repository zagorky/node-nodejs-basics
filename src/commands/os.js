import {ERROR_MESSAGES} from "../constants.js";
import {logSuccess, validateArgs} from "../utils.js";
import {arch, cpus, EOL, homedir, userInfo} from "node:os";

export const osCommandsRegistry = {
    "--EOL": () => logSuccess(JSON.stringify(EOL)),
    "--cpus": () => {
        const cpuList = cpus();
        logSuccess(`Overall amount of CPUs: ${cpuList.length}`);
        cpuList.forEach(({model, speed}, i) =>
            logSuccess(`CPU ${i + 1}: ${model} (${(speed / 1000).toFixed(2)} GHz)`)
        );
    },
    "--homedir": () => logSuccess(homedir()),
    "--username": () => logSuccess(userInfo().username),
    "--architecture": () => logSuccess(arch()),
};

/** Operating system info (prints following information in console) */
export const os = async (args) => {
    validateArgs(args)
    const command = args[0];
    const action = osCommandsRegistry[command];
    if (!action) {
        throw new Error(ERROR_MESSAGES.INVALID_INPUT);
    }
    action();
};
