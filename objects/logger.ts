export class Logger {
    private level: LogLevel = LogLevel.Essential;

    constructor(level:LogLevel) {
        this.level = level;
    }

    /**
     * Logs the message based on the loglevel of the logger and of the message.
     * @param message message to log
     * @param level the log level of the current message
     */
    public log(message:string|object, level:LogLevel):void {
        if (this.level < level)
            return;
        if (typeof message == 'string')
            process.stdout.write(`${message}\r\n`);
        else if (typeof message == 'object')
            console.dir(message);
    }
}

export enum LogLevel {
    Essential = 0,
    Verbose = 1
}