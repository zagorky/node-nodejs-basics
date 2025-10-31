import {createInterface} from "node:readline/promises";
import {completer} from "../utils.js";
import {stdin, stdout} from "node:process";


const readline = createInterface({input: stdin, output: stdout, completer});

export const closeRL = () => readline.close();

export const prompt = () => readline.prompt();

export const listen = (event, callback) => {
    readline.on(event, callback)
}

export const pause = () => readline.pause();

export const resume = () => readline.resume();