import {ERROR_MESSAGES} from "../constants.js";
import {logSuccess} from "../utils.js";
import {arch, cpus, EOL, homedir, userInfo} from 'node:os';


/**Operating system info (prints following information in console)**/
export const os = async (args) => {
    if (!args[0]) {
        throw new Error(ERROR_MESSAGES.INVALID_INPUT);
    }
    switch (args[0]) {
        case '--EOL':
            logSuccess(JSON.stringify(EOL));
            break;
        case '--cpus':
            const cpuList = cpus();
            logSuccess(`Overall amount of CPUS: ${cpuList.length}`);
            cpuList.forEach((cpu, i) => {
                logSuccess(`CPU ${i + 1}: ${cpu.model} (${(cpu.speed / 1000).toFixed(2)} GHz)`);
            });
            break;
        case '--homedir':
            logSuccess(homedir());
            break;
        case '--username':
            logSuccess(userInfo().username);
            break;
        case '--architecture':
            logSuccess(arch());
            break;
        default:
            throw new Error(ERROR_MESSAGES.INVALID_INPUT);
    }
}