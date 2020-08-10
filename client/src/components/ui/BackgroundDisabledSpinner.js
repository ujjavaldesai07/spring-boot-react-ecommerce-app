import React from 'react';
import {Dimmer, Loader} from "semantic-ui-react";
import log from 'loglevel';

export default function BackgroundDisabledSpinner() {
    log.info(`[BackgroundDisabledSpinner] Rendering BackgroundDisabledSpinner Component...`)
    return (
        <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
        </Dimmer>
    );
}
