import {parsePath, validateArgs} from "../utils.js";
import {dirname} from "node:path";
import {readdir, stat} from 'node:fs/promises';
import {chdir, cwd} from 'node:process';

/**Go upper from current directory (when you are in the root folder this operation shouldn't change working directory)**/
export const up = () => {
    const currentPath = cwd()
    chdir(dirname(currentPath))
}

/**Go to dedicated folder from current directory (path_to_directory can be relative or absolute)**/
export const cd = async (args) => {
    validateArgs(args)
    const newPath = parsePath(args[0]);
    await stat(newPath);
    chdir(newPath);
}

/**Print in console list of all files and folders in current directory. List should contain:
 *- files and folder names (for files - with extension)
 *- folders and files are sorted in alphabetical order ascending, but list of folders goes first
 *- type of directory content should be marked explicitly (e.g. as a corresponding column value)**/
export const ls = async () => {
    const entries = await readdir(cwd(), {withFileTypes: true});
    const sorted = entries.sort((a, b) => {
        if (a.isDirectory() && !b.isDirectory()) return -1;
        if (!a.isDirectory() && b.isDirectory()) return 1;
        return a.name.localeCompare(b.name);
    });

    const tableData = sorted.map(entry => ({
        Name: entry.name,
        Type: entry.isDirectory() ? 'directory' : 'file'
    }));

    console.table(tableData);
}