import {createInterface} from "node:readline/promises";
import {stdin, stdout} from "node:process";
import {commands} from "../constants.js";

/** Provides tab-autocompletion suggestions based on user input. Returns an array of possible matches or the full list if no match is found. **/
export const completer = (command) => {
    const hits = commands.filter(cmd => cmd.startsWith(command));
    return [hits.length ? hits : commands, command];

}

const readline = createInterface({input: stdin, output: stdout, completer});

/** Closes the readline interface. **/
export const closeRL = () => readline.close();

/** Prompts the user for input. **/
export const prompt = () => readline.prompt();

/** Listens for a specific event on the readline interface. **/
export const listen = (event, callback) => {
    readline.on(event, callback)
}

/** Pauses the readline interface. **/
export const pause = () => readline.pause();

/** Resumes the readline interface. **/
export const resume = () => readline.resume();