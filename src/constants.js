export const ERROR_MESSAGES = {
    FS_OPERATION_FAILED: 'FS operation failed',
    STREAM_OPERATION_FAILED: 'Stream operation failed',
    HASH_CALCULATION_FAILED: 'Hash calculation failed',
    SOURCE_FILE_DOESNT_EXIST: "Source file doesn't exist",
    TARGET_FILE_DOESNT_EXIST: "Target file doesn't exist",
    FAIL_TO_COMPRESS: "Error compressing file",
    FAIL_TO_DECOMPRESS: "Error decompressing file",
    CP_OPERATION_FAILED: "Error spawning child process",
    FM_OPERATION_FAILED: "Error performing file manager operation",
    INVALID_INPUT: 'Invalid input',
    OPERATION_FAILED: 'Operation failed',
}

export const filesDirectory = 'files'

export const commands = [
    'up',
    'cd',
    'ls',
    'cat',
    'add',
    'mkdir',
    'rn',
    'cp',
    'mv',
    'rm',
    'os --EOL',
    'os --cpus',
    'os --homedir',
    'os --username',
    'os --architecture',
    'hash',
    'compress',
    'decompress',
    '.exit',
];