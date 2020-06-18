import React from 'react';
import Helmet from 'react-helmet';

const DocumentTitle = ({ title }) => {
    const defaultTitle = 'Shoppers';
    return (
        <Helmet>
            <title>{title ? title : defaultTitle}</title>
        </Helmet>
    );
};

export { DocumentTitle };