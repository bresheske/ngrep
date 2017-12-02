import { Logger, LogLevel } from "./objects/logger";
import { IO } from "./objects/io";
let a = require('minimist')(process.argv.slice(2));

// main entrypoint to the simple grep tool.
(async(args:any) => {
    let verbose = args.v;
    let regex = args.r;
    let fregex = args.f;
    let logger = new Logger(verbose ? LogLevel.Verbose : LogLevel.Essential);
    let io = new IO();

    if (!fregex) {
        logger.log(`parameter 'f' is expected.`, LogLevel.Essential);
        return;
    }

    logger.log(`grep started. arguments:`, LogLevel.Verbose);
    logger.log(args, LogLevel.Verbose);
    logger.log(`parsed arguments:`, LogLevel.Verbose);
    logger.log(`  verbose: ${verbose}`, LogLevel.Verbose);
    logger.log(`  regex: ${regex}`, LogLevel.Verbose);
    logger.log(`  files: ${fregex}`, LogLevel.Verbose);

    let files = await io.findFiles(fregex);
    logger.log(`found files (${files.length}):`, LogLevel.Verbose);
    if (!regex) {
        // we only want to search for filenames.
        for (let f of files)
            logger.log(`${f}`, LogLevel.Essential);
    }
    else {
        // we want to search file contents.
        logger.log(`reading files for regex ${regex}...`, LogLevel.Verbose);
        let results = await io.findLines(files, regex);
        logger.log(`found (${results.length}):`, LogLevel.Verbose);
        for (let r of results)
            logger.log(r, LogLevel.Essential);
    }
    
})(a);