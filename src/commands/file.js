import {mkdir as fsMkdir, readFile, rename, rm as fsRm, writeFile} from 'node:fs/promises';
import {cwd} from 'node:process';
import {dirname, join} from 'node:path';
import {logSuccess, parsePath, validateArgs} from "../utils.js";

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

//TODO: implement with streams
/** Copy file (should be done using Readable and Writable streams) **/
export const cp = async (args) => {
    validateArgs(args)
    console.log("TODO: implement with streams");
};

/** Move file (same as copy but initial file is deleted, copying part should be done using Readable and Writable streams) **/
export const mv = async (args) => {
    await cp(args);
    await fsRm(parsePath(args[0]));
};
