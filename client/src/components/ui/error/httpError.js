import React from 'react';
import {BAD_REQUEST_ERROR_CODE, INTERNAL_SERVER_ERROR_CODE} from "../../../constants/http_error_codes";
import {InternalServerError} from "./internalServerError";
import {BadRequest} from "./badRequest";
import log from 'loglevel';

export const HTTPError = props => {
    log.info(`[HTTPError] props.statusCode = ${props.statusCode}`)

    switch (props.statusCode) {
        case INTERNAL_SERVER_ERROR_CODE:
            return <InternalServerError/>
        case BAD_REQUEST_ERROR_CODE:
            return <BadRequest/>
        default:
            return null
    }
};