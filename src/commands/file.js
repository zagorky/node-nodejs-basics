import {mkdir as fsMkdir, readFile, rename, rm as fsRm, writeFile} from 'node:fs/promises';
import {cwd} from 'node:process';
import {pipeline} from 'node:stream/promises';
import {createReadStream, createWriteStream} from 'node:fs';
import {dirname, join} from 'node:path';
import {isFileExists, logSuccess, parsePath, validateArgs} from "../utils.js";

/** Read file and print its content in console **/
export const cat = async (args) => {
    validateArgs(args)
    const readPath = parsePath(args[0]);
    const content = await readFile(readPath, {encoding: 'utf-8'});
    logSuccess(content);
};

/** Create empty file in current working directory **/
export const add = async (args) => {
    validateArgs(args)
    await writeFile(join(cwd(), args[0]), '', {flag: 'wx'});
};

/** Create new directory in current working directory **/
export const mkdir = async (args) => {
    validateArgs(args)
    await fsMkdir(join(cwd(), args[0]));
};

/** Rename file (content should remain unchanged) **/
export const rn = async (args) => {
    validateArgs(args, 2)
    const oldPath = parsePath(args[0]);
    const dir = dirname(oldPath);
    await rename(oldPath, join(dir, args[1]));
};

/** Delete file **/
export const rm = async (args) => {
    validateArgs(args)
    await fsRm(parsePath(args[0]));
};

/** Copy file (should be done using Readable and Writable streams) **/
export const cp = async (args) => {
    validateArgs(args, 2);
    const src = parsePath(args[0]);
    const dest = parsePath(args[1]);
    const [isSrcExist, isDestExists] = await Promise.all([isFileExists({path: src}), isFileExists({path: dest})]);

    if (!isSrcExist || isDestExists) {
        throw new Error(`File ${args[0]} doesn't exist or file ${args[1]} already exists`)
    }

    await pipeline(createReadStream(src), createWriteStream(dest));
};

/** Move file (same as copy but initial file is deleted, copying part should be done using Readable and Writable streams) **/
export const mv = async (args) => {
    validateArgs(args, 2);
    await cp(args);
    await fsRm(parsePath(args[0]));
};
