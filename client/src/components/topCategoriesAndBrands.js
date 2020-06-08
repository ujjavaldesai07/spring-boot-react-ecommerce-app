import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Typography} from "@material-ui/core";

const brandsImages = [
    {id: 1, src: require('../images/brands/b1.png')},
    {id: 2, src: require('../images/brands/b2.png')},
    {id: 3, src: require('../images/brands/b3.png')},
    {id: 4, src: require('../images/brands/b4.png')},
    {id: 5, src: require('../images/brands/b5.jpg')},
    {id: 6, src: require('../images/brands/b6.png')}
];

const categoriesImages = [
    {id: 7, src: require('../images/categories/cat1.png')},
    {id: 8, src: require('../images/categories/cat2.png')},
    {id: 9, src: require('../images/categories/cat3.png')},
    {id: 10, src: require('../images/categories/cat4.png')},
    {id: 11, src: require('../images/categories/cat5.png')},
    {id: 12, src: require('../images/categories/cat6.png')}
];


const TopCategoriesAndBrands = () => {
    const renderImageList = (imageList) => {
        return imageList.map(({id, src}) => {
            return (
                <Grid key={id} item xs={2}>
                    <img src={src} alt={src} style={{width: '90%', height: '100%'}}/>
                </Grid>
            )
        });
    };
    return (
        <div>
            <Typography variant="h5" noWrap style={{padding: '30px 0 0 30px', textDecoration: 'underline'}}>
                #Shop Top Brands
            </Typography>
            <Grid container spacing={0} style={{padding: '10px 0 0 30px'}}>
                {renderImageList(brandsImages)}
            </Grid>
            <Typography variant="h5" noWrap style={{padding: '30px 0 0 30px', textDecoration: 'underline'}}>
                #Shop Top Categories
            </Typography>
            <Grid container spacing={0} style={{padding: '20px 0 70px 30px'}}>
                {renderImageList(categoriesImages)}
            </Grid>
        </div>
    )
};
export default TopCategoriesAndBrands;