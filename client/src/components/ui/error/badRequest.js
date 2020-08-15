import React from 'react';
import badRequestImage from '../../../images/badRequest400.png'
import {RenderErrorImage} from "./renderErrorImage";

export const BadRequest = () => {

    return (
        <RenderErrorImage image={badRequestImage} name="bad-request-image"/>
    );
};