import * as fs from 'async-file';
import * as path from 'path';
import * as readline from 'readline';
import { resolve } from 'dns';

export class IO {

    constructor() {}

    /**
     * Returns a list of file paths that match a particular regex.
     * @param regex regular expression string to search for in each filename
     */
    public async findFiles(regex:string) : Promise<Array<string>> {
        let results = [] as Array<string>;
        let r = new RegExp(regex);
        let workingpath = await fs.realpath('.');
        await this.findFilesRec(r, workingpath, results);
        return results;
    }

    /**
     * This is a recursive function which populates 'list'.
     * @param regex regular expression to search for in each filename
     * @param dir starting root directory to recurse
     * @param list in-out list of files; this will be populated by this function
     */
    private async findFilesRec(regex:RegExp, dir:string, list:Array<string>) {
        let files = await fs.readdir(dir);
        for (let f of files) {
            let full = path.join(dir, f);
            let stat = await fs.stat(full);
            if (stat.isDirectory())
                await this.findFilesRec(regex, full, list);
            else if (regex.test(full)) {
                list.push(full);
            }
        }
    }

    /**
     * Returns a list of strings indicating where a regex is found in a given list of filenames.
     * @param list a list of filenames to search through
     * @param regex a regular express string to search for in each file
     */
    public findLines(list:Array<string>, regex: string): Promise<Array<string>> {

        return new Promise<Array<string>>((resolve, reject) => {
            let results = [] as Array<string>;
            let r = new RegExp(regex);
            let numclosed = 0;
            for (let f of list) {
                let linenum = 0;
                let reader = readline.createInterface({
                    input: fs.createReadStream(f)
                });
                reader.on('line', (line) => {
                    linenum++;
                    if (r.test(line))
                        results.push(`${f}:${linenum}`);
                });
                reader.on('close', () => {
                    numclosed++;
                    if (numclosed == list.length)
                        resolve(results);
                });
            }
        });
    }

}