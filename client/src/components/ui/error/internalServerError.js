import React from 'react';
import internalServerErrorImage from '../../../images/internalServer500.png'
import {RenderErrorImage} from "./renderErrorImage";

export const InternalServerError = () => {

    return (
        <RenderErrorImage image={internalServerErrorImage} name="internal-server-error-image"/>
    );
};