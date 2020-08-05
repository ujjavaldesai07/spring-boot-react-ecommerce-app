import React from 'react';
import {Grid, Card, CardContent} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

export const SummaryCard = (props) => {

    const renderCardContent = () => {
        let id = 0
        return props.contentList.map((formValue) => {
            ++id
            return (
                <Grid item key={`sc-${id}`} style={{marginBottom: "0.5rem"}}>
                    {formValue}
                </Grid>
            )
        })
    }

    return (
        <Grid item lg={5} style={{margin: "2rem 0 2rem 2rem"}}>
            <Card style={{height: "fit-content", fontSize: "1.1rem"}}>
                <CardContent style={{height: "fit-content"}}>
                    {renderCardContent()}
                </CardContent>

                <Grid container style={{padding: "0 0.8rem 1rem 1rem"}}>
                    <Grid item xs={6} style={{alignSelf: "center"}}>
                        <Button variant="outlined" color="inherit" fullWidth style={{
                            height: "3rem",
                            fontSize: "1rem"
                        }} onClick={props.editBtnHandler}>
                            Edit
                        </Button>
                    </Grid>

                    <Grid item container xs={6} justify={"flex-end"}>
                        <IconButton onClick={props.deleteBtnHandler}>
                            <DeleteIcon fontSize="large"/>
                        </IconButton>
                    </Grid>

                </Grid>
            </Card>
        </Grid>
    )
}