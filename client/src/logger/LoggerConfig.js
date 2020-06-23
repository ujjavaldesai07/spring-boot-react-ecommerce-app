import Logger from './Logger';
import {LoggerRegisterInfo} from './loggerTypes'

class LoggerConfig {

    static loggerMap

    static enableAll() {
        Logger.globalLoggerLevel = Logger.Levels.ERROR
    }

    static enableAllWithSpecificLevel(level) {
        Logger.globalLoggerLevel = level
    }

    static disableAll() {
        Logger.globalLoggerLevel = Logger.Levels.DISABLE
    }

    static getLogger(id) {
        if (this.loggerMap.has(id)) {
            return this.loggerMap.get(id)
        }
    }

    static setLoggerMap() {
        if(!this.loggerMap) {
            this.loggerMap = new Map()
        }
    }

    static subscribeAllLoggers() {
        this.setLoggerMap()
        LoggerRegisterInfo.map(({id, level}) => {
            // console.log("Subscribing Logger id = " + id + ", Level = " + level)
            this.loggerMap.set(id, new Logger(level))
        })
    }
}

export default LoggerConfig;