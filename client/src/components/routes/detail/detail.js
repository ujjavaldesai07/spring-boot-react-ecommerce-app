import React from 'react';
import {Button} from "@material-ui/core";
import '../../../styles/detail.css'
import log from 'loglevel';

function Detail() {

    log.info("[Detail] Rendering Detail Component.")
    return (
        <div className="container">
            <div className="item_1">
                IMAGE
            </div>
            <div className="item_2">
                <div>
                    BRAND
                </div>
                <div>
                    PRODUCT NAME
                </div>
                <div>
                    PRICE
                </div>
                <div className="detail-button">
                    <Button variant="contained" size="large" color="secondary">
                        ADD TO BAG
                    </Button>
                    <Button variant="outlined" color="default">
                        CHECKOUT
                    </Button>
                </div>
            </div>
            <div className="item_3">
                DESCRIPTION
            </div>
        </div>
    );
}

export default Detail;