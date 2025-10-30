import {createInterface} from "node:readline/promises";
import {chdir, exit, stdin, stdout} from "node:process";
import {homedir} from "node:os";
import {styleText} from "node:util";
import {completer, logError, parseUsername, printCurrentDir} from "../utils.js";
import {ERROR_MESSAGES} from "../constants.js";
import {commandsRegistry} from "../commands/index.js";

/** Starts the file manager shell. Initializes the shell environment, handles user input, and provides tab completion. **/
export const startShell = async () => {
    chdir(homedir());
    const rl = createInterface({input: stdin, output: stdout, completer});

    const username = parseUsername();
    console.log(styleText("cyan", `Welcome to the File Manager, ${username}`));
    console.log(styleText(["italic", "dim", "magentaBright"], `🧚🏼  Tap TAB to autocomplete commands`));

    printCurrentDir();
    rl.prompt();

    const commandHandlers = {
        ...commandsRegistry,
        ".exit": () => {
            rl.close();
            exit(0);
        },
    };

    rl.on("line", async (line) => {
        const [cmd, ...args] = line.trim().split(/\s+/);
        const handler = commandHandlers[cmd];

        try {
            if (handler) {
                rl.pause();
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
            rl.resume();
            printCurrentDir();
            rl.prompt();
        }
    });

    rl.on("close", () => {
        console.log(styleText("magentaBright", `Thank you for using File Manager, ${username}, goodbye!`));
        exit(0);
    });
};
