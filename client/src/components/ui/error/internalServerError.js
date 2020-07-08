import React from 'react';
import {Box} from "@material-ui/core";
import internalServerErrorImage from '../../../images/internalServerError500.png'

export const InternalServerError = () => {

    return (
        <Box display="flex"
             justifyContent="center"
             flexDirection="column"
             alignItems="center">
            <Box alignSelf="center">
                <img src={internalServerErrorImage} alt="pageNotFoundImage"/>
            </Box>
        </Box>
    );
};