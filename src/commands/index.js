import {cd, ls, up} from "./navigation.js";
import {hash} from "./hash.js";
import {compress, decompress} from "./zip.js";
import {add, cat, cp, mkdir, mv, rm, rn} from "./file.js";
import {os} from "./os.js";

export const commandsRegistry = {
    up,
    cd,
    ls,
    cat,
    add,
    mkdir,
    rn,
    cp,
    mv,
    rm,
    os,
    hash,
    compress,
    decompress,
};