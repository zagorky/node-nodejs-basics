import {createInterface} from "node:readline/promises";
import {stdin, stdout} from "node:process";
import {commandsRegistry} from "../commands/index.js";

export const commands = [
    ...Object.keys(commandsRegistry),
    'os --EOL',
    'os --cpus',
    'os --homedir',
    'os --username',
    'os --architecture'
];

/** Provides tab-autocompletion suggestions based on user input. Returns an array of possible matches or the full list if no match is found. **/
export const completer = (command) => {
    const hits = commands.filter(cmd => cmd.startsWith(command));
    return [hits.length ? hits : commands, command];

}
const readline = createInterface({input: stdin, output: stdout, completer});

export const closeRL = () => readline.close();

export const prompt = () => readline.prompt();

export const listen = (event, callback) => {
    readline.on(event, callback)
}

export const pause = () => readline.pause();

export const resume = () => readline.resume();