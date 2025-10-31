import {chdir, exit} from "node:process";
import {homedir} from "node:os";
import {styleText} from "node:util";
import {logError, parseUsername, printCurrentDir} from "../utils.js";
import {ERROR_MESSAGES} from "../constants.js";
import {commandsRegistry} from "../commands/index.js";
import {listen, pause, prompt, resume} from "./readline.js";

/** Starts the file manager shell. Initializes the shell environment, handles user input, and provides tab completion. **/
export const startShell = async () => {
    chdir(homedir());

    const username = parseUsername();
    console.log(styleText("cyan", `Welcome to the File Manager, ${username}`));
    console.log(styleText(["italic", "dim", "magentaBright"], `🧚🏼  Tap TAB to autocomplete commands`));

    printCurrentDir();
    prompt();

    const commandHandlers = {
        ...commandsRegistry
    };

    listen("line", async (line) => {
        const [cmd, ...args] = line.trim().split(/\s+/);
        const handler = commandHandlers[cmd];

        try {
            if (handler) {
                pause();
                console.log(styleText(["blueBright", "dim"], `⏳ Executing command: ${cmd} ${args.join(" ")}`));

                await handler(args);

                console.log(styleText(["magenta", "dim"], "⚡️ Command executed successfully"));
            } else if (cmd) {
                logError(ERROR_MESSAGES.INVALID_INPUT);
            }
        } catch (error) {
            const message = error.message.includes("ENOENT")
                ? ERROR_MESSAGES.OPERATION_FAILED
                : error.message;
            logError(message);
        } finally {
            resume();
            printCurrentDir();
            prompt();
        }
    });

    listen("close", () => {
        console.log(styleText("magentaBright", `Thank you for using File Manager, ${username}, goodbye!`));
        exit(0);
    });
};
