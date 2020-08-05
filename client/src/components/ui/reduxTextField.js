import {TextField} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import React from "react";

const textFieldStyles = {
    width: "100%",
    height: "fit-content",
    marginTop: "20px"
}

export const renderReduxTextField = (
    {placeholder, icon, type, shrink, selectField, input, label, meta: {touched, error}, ...custom}) => {

    let errorExist = touched && error && error !== "";
    return (
        <TextField
            label={label}
            variant="outlined"
            fullWidth
            size="medium"
            type={type}
            select={selectField}
            style={textFieldStyles}
            placeholder={placeholder}
            InputLabelProps={{shrink: shrink}}
            error={errorExist}
            helperText={errorExist ? error : null}
            InputProps={
                icon ? {
                    startAdornment: (
                        <InputAdornment position="start">
                            {icon}
                        </InputAdornment>
                    )
                } : null
            }
            {...input}
            {...custom}
        />
    );
}