import {logger} from "../utils.js";

const parseArgs = () => {
    const args = process.argv.slice(2);

    logger({
        message: Object.entries(args)
            .filter((_, index) => index % 2 === 0)
            .map((key, index) => {
                const propName = key[1].replace('--', '');
                const value = args[index * 2 + 1];
                return `${propName} is ${value}`;
            })
            .join(', ')
    })
};

parseArgs();
