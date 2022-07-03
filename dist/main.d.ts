declare class FileForeach {
    file: File;
    chunkSize: number;
    chunks: number;
    currentChunk: number;
    constructor(file: File, chunkSize: any);
    isOutRange(): boolean;
    forEach(callback: any): void;
    nextLoad(): Blob;
}
declare function ffeach(file: File, chunkSize: number): FileForeach;
declare function hashFile(file: File, callback: (result: string) => void, chunkSize: any): void;
declare const _default: {
    ffeach: typeof ffeach;
    hashFile: typeof hashFile;
    FileForeach: typeof FileForeach;
};
export default _default;
