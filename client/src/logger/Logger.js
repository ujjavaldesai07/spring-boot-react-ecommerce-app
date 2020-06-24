class Logger {
    static Levels = {
        ERROR:1,
        WARN:2,
        INFO:3,
        DEBUG:4,
        DISABLE:99,
        MAX_LEVEL:100
    };

    static globalLoggerLevel = Logger.Levels.MAX_LEVEL;

    constructor(level = Logger.globalLoggerLevel) {
        this.currentLevel = level
        // console.log("constructor Level = " + level)
    }

    disable() {
        this.currentLevel = Logger.Levels.DISABLE
    }

    enable(level = Logger.Levels.ERROR) {
        this.currentLevel = level
    }

    send(level, message) {
        // eslint-disable-next-line default-case
        switch (level) {
            case Logger.Levels.DEBUG:
                console.log(`%c[${this.getCurrentTime()}] [DEBUG]: ${message}`, "color:orange; font-size: 15px; font-weight: bold")
                break
            case Logger.Levels.INFO:
                console.log(`%c[${this.getCurrentTime()}] [INFO]: ${message}`, "color:green; font-size: 15px; font-weight: bold")
                break
            case Logger.Levels.WARN:
                console.log(`%c[${this.getCurrentTime()}] [WARN]: ${message}`, "color:yellow; font-size: 15px; font-weight: bold")
                break
            case Logger.Levels.ERROR:
                console.log(`%c[${this.getCurrentTime()}] [ERROR]: ${message}`, "color:red; font-size: 15px; font-weight: bold")
                break
        }
    }

    log(level, message) {
        console.log("Level = " + level)
        if(level === Logger.Levels.DISABLE) {
            return;
        }

        if(Logger.globalLoggerLevel <= level || this.currentLevel <= level) {
            this.send(level, message)
        }
    }

    getCurrentTime() {
        let d = new Date();
        return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`
    }

    error(message) {
        this.log(Logger.Levels.ERROR, message);
    }

    warn(message) {
        this.log(Logger.Levels.WARN, message);
    }

    info(message) {
        this.log(Logger.Levels.INFO, message);
    }

    debug(message) {
        this.log(Logger.Levels.DEBUG, message);
    }
}

export default Logger;