import {logger} from "../utils.js";

const parseEnv = () => {
    logger({
        message: Object.entries(process.env)
            .filter(([variable]) => variable.startsWith('RSS_'))
            .map(([key, value]) => `${key}=${value}`)
            .join('; ')
    })
};

parseEnv();
