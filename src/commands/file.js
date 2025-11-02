import {mkdir as fsMkdir, readFile, rename, rm as fsRm, writeFile} from 'node:fs/promises';
import {cwd} from 'node:process';
import {pipeline} from 'node:stream/promises';
import {createReadStream, createWriteStream} from 'node:fs';
import {dirname, join} from 'node:path';
import {logSuccess, parsePath, parseSrcDestPaths, throwIfFilesDontExist, validateArgs} from "../utils.js";

export const cat = async (args) => {
    validateArgs(args)
    const readPath = parsePath(args[0]);
    const content = await readFile(readPath, {encoding: 'utf-8'});
    logSuccess(content);
};

export const add = async (args) => {
    validateArgs(args)
    await writeFile(join(cwd(), args[0]), '', {flag: 'wx'});
};

export const mkdir = async (args) => {
    validateArgs(args)
    await fsMkdir(join(cwd(), args[0]));
};

export const rn = async (args) => {
    validateArgs(args, 2)
    const oldPath = parsePath(args[0]);
    const dir = dirname(oldPath);
    await rename(oldPath, join(dir, args[1]));
};

export const rm = async (args) => {
    validateArgs(args)
    await fsRm(parsePath(args[0]));
};

export const cp = async (args) => {
    validateArgs(args, 2);
    const {src, dest} = parseSrcDestPaths(args);
    await throwIfFilesDontExist({src, dest, args});
    await pipeline(createReadStream(src), createWriteStream(dest));
};

export const mv = async (args) => {
    validateArgs(args, 2);
    await cp(args);
    await fsRm(parsePath(args[0]));
};
