import React from 'react';
import {Box} from "@material-ui/core";
import badRequestImage from '../../../images/badRequest400.png'

export const BadRequest = () => {

    return (
        <Box display="flex"
             justifyContent="center"
             flexDirection="column"
             alignItems="center">
            <Box alignSelf="center">
                <img src={badRequestImage} alt="badRequestImage"/>
            </Box>
        </Box>
    );
};