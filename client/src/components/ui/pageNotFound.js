import React from 'react';
import {Box} from "@material-ui/core";
import pageNotFoundImage from '../../images/search404.png'

export const PageNotFound = () => {

    return (
        <Box display="flex"
             justifyContent="center"
             flexDirection="column"
             alignItems="center"
             css={{height: "50vh"}}>
            <Box alignSelf="center" pb={8}>
                <img src={pageNotFoundImage}/>
            </Box>
            <Box alignSelf="center" css={{fontSize: '2rem', fontWeight: 400}}>
                We couldn't find any matches!
            </Box>
            <Box alignSelf="center" pt={2} css={{fontSize: '1rem', fontWeight: 300}}>
                Please check the spelling or try searching something else
            </Box>
        </Box>
    );
};