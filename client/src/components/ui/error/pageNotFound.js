import React from 'react';
import {Box, Button} from "@material-ui/core";
import pageNotFoundImage from '../../../images/pageNotFound404.png'
import history from "../../../history";

export const PageNotFound = () => {
    const onHomeBtnClick = () => {
        history.push(`/`);
    }

    return (
        <Box display="flex"
             justifyContent="center"
        flexDirection="column">
            <Box pt={6}>
                <img src={pageNotFoundImage} alt="pageNotFoundImage" width="30%"
                     style={{display: 'block', margin: 'auto'}}/>
            </Box>
            <Box display="flex" py={2} justifyContent="center">
                <Button variant="contained" size="large" color="secondary"
                        onClick={onHomeBtnClick}
                        style={{width: '20%'}}>
                    Go Home
                </Button>
            </Box>
        </Box>
    );
};