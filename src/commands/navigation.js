import {parsePath, validateArgs} from "../utils.js";
import {dirname} from "node:path";
import {readdir, stat} from 'node:fs/promises';
import {chdir, cwd} from 'node:process';

export const up = async () => {
    const currentPath = cwd()
    chdir(dirname(currentPath))
}

export const cd = async (args) => {
    validateArgs(args)
    const newPath = parsePath(args[0]);
    await stat(newPath);
    chdir(newPath);
}


export const ls = async () => {
    const entries = await readdir(cwd(), {withFileTypes: true});
    const sorted = entries.sort((a, b) => {
        if (a.isDirectory() && !b.isDirectory()) {
            return -1;
        }
        if (!a.isDirectory() && b.isDirectory()) {
            return 1;
        }
        return a.name.localeCompare(b.name);
    });

    const tableData = sorted.map(entry => ({
        Name: entry.name,
        Type: entry.isDirectory() ? 'directory' : 'file'
    }));

    console.table(tableData);
}