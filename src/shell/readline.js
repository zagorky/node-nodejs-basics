import {createInterface} from "node:readline/promises";
import {stdin, stdout} from "node:process";
import {commands} from "../constants.js";

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