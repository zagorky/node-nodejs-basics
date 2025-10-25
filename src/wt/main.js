import {cpus} from 'node:os';
import {Worker} from 'node:worker_threads';
import {getPathData, logger} from "../utils.js";
import {join} from "node:path";

const cpusNumber = cpus().length;
const {dirName} = getPathData(import.meta.url)
const workerPath = join(dirName, './worker.js')
const start = 10

const performCalculations = async () => {
    const results = await Promise.all(Array.from({length: cpusNumber}, (_, index) => service(start + index)));
    logger({message: results})
};

const service = (data) => {
    return new Promise((resolve) => {
        const worker = new Worker(workerPath, {workerData: data});
        worker.on('message', resolve);
    })
}

await performCalculations();
