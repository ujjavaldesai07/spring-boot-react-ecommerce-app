import Logger from './Logger';

export const LoggerTypes = {
    MAIN_SCREEN_LOGGER: 1,
    FILTER_SCREEN_LOGGER: 2
}

export const LoggerRegisterInfo = [
    {
        id: LoggerTypes.MAIN_SCREEN_LOGGER,
        level: Logger.Levels.INFO
    },
    {
        id: LoggerTypes.FILTER_SCREEN_LOGGER,
        level: Logger.Levels.DEBUG
    },
]