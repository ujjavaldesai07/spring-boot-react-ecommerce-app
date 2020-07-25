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
import {labelTextFieldStyles, textFieldStyles} from "../../../styles/js/formStyles";

export const FormTextField = (props) => {

    const renderReduxFormField = () => {
        let required = true
        if (!props.validationRules) {
            required = false
        }

        return (
            <Field
                name={props.name}
                label={props.label}
                component={TextField}
                variant="outlined"
                fullWidth
                size="medium"
                style={textFieldStyles}
                validate={props.validationRules}
                required={required}
            />
        )
    }

    const renderShrinkLabelReduxFormField = () => {
        return (
            <Field
                name={props.name}
                label={props.label}
                component={TextField}
                variant="outlined"
                fullWidth
                size="medium"
                style={labelTextFieldStyles}
                placeholder={props.placeholder}
                InputLabelProps={{shrink: true}}
                validate={props.validationRules}
                required
                InputProps={props.inputProps}
            />
        )
    }

    return (
        <>
            {props.fixedLabel ? renderShrinkLabelReduxFormField(): renderReduxFormField()}
        </>
    )
}