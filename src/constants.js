import {commandsRegistry} from "./commands/index.js";

export const ERROR_MESSAGES = {
    FM_OPERATION_FAILED: "Error performing file manager operation",
    INVALID_INPUT: 'Invalid input',
    OPERATION_FAILED: 'Operation failed',
}

export const commands = [
    ...Object.keys(commandsRegistry),
    'os --EOL',
    'os --cpus',
    'os --homedir',
    'os --username',
    'os --architecture'
];