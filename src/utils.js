import {dirname, resolve} from "node:path";
import {commands, ERROR_MESSAGES} from "./constants.js";
import {parseArgs, styleText} from 'node:util'
import {cwd} from 'node:process';

/** Provides tab-autocompletion suggestions based on user input. Returns an array of possible matches or the full list if no match is found. **/
export const completer = (command) => {
    const hits = commands.filter(cmd => cmd.startsWith(command));
    return [hits.length ? hits : commands, command];

}

/** Parses the "--username" argument from the command-line input. Returns the provided username or "Anonymous" if not specified. **/
export const parseUsername = () => {
    const {values} = parseArgs({
        options: {
            username: {
                type: 'string',
            },
        },
        strict: false,
    })

    return values.username ?? 'Anonymous'
}

/** Prints the current working directory to the console in yellow. */
export const printCurrentDir = () => {
    console.log(styleText('yellowBright', `You are currently in ${cwd()}`));
};

/** Resolves a given input path relative to the current working directory. Returns an absolute path.**/
export const parsePath = (inputPath) => {
    return resolve(cwd(), inputPath);
};

/** Checks if the given path is the root directory. Returns true if it is, otherwise false. **/
export const isRoot = (path) => {
    return dirname(path) === path;
};

/** Logs an error message in red (dimmed) style. **/
export const logError = (error) => console.log(styleText(['redBright', 'dim'], error));

/** Logs a success or informational message in cyan (dimmed) style. **/
export const logSuccess = (input) => console.log(styleText(['cyanBright', 'dim'], input));

/** Validates command arguments. Ensures the input is an array with at least the required number of arguments, and that none of them are empty. Throws an error if validation fails. **/
export const validateArgs = (args, count = 1) => {
    if (!Array.isArray(args) || args.length < count || args.some(a => !a)) {
        throw new Error(ERROR_MESSAGES.INVALID_INPUT);
    }
};