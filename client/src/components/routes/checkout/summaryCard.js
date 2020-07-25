import React, {Component} from 'react';
import log from 'loglevel';
import {MenuItem, Grid, Card, CardContent, Divider} from "@material-ui/core";
import ContinueButton from "./continueButton";
import {withStyles} from "@material-ui/core/styles";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {TextField} from "redux-form-material-ui"
import {stateCodes} from "../../../constants/stateCodes";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import {setShippingAddress} from "../../../actions"
import IconButton from '@material-ui/core/IconButton';
import Modal from "../../ui/modal";
import {ModalConfirmation} from "../../ui/modalConfirmation";

export const SummaryCard = (props) => {

    const renderCardContent = () => {

        return props.contentList.map((formValue) => {
            return (
                <Grid item key={formValue} style={{marginBottom: "0.5rem"}}>
                    {formValue}
                </Grid>
            )
        })
    }

    return (
        <Grid item lg={5} style={{margin: "2rem"}}>
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