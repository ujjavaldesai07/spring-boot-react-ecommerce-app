import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import log from "loglevel";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    label: {
        fontWeight: "bold",
        fontSize: "0.9rem"
    }
}));

export default function RadioButtonsGroup(props) {
    const classes = useStyles()

    const handleChange = (event) => {
        log.info(`[RadioButtonsGroup]: handleChange event.target.value = ${event.target.value}`)
        props.onChangeHandler(event.target.value)
    };

    const renderRadioButtonList = rbList => {

        if (!rbList) {
            log.info(`[RadioButtonsGroup]: rbList is null`)
            return null
        }

        log.debug(`[RadioButtonsGroup]: rbList = ${JSON.stringify(rbList)}`)

        return rbList.map(({id, value}) => {
            return <FormControlLabel key={id}
                                     value={value}
                                     control={<Radio size="small"/>}
                                     label={value}
                                    classes={{label: classes.label}}/>
        })
    }

    log.debug(`[RadioButtonsGroup]: props.attrList = ${props.attrList}`)
    log.debug(`[RadioButtonsGroup]: props.selectedValue = ${props.selectedValue}`)
    log.info(`[RadioButtonsGroup]: Rendering RadioButtonsGroup Component`)

    return (
        <FormControl component="fieldset">
            <RadioGroup aria-label={props.title} name={props.title}
                        value={props.selectedValue? props.selectedValue: false}
                        onChange={handleChange}>
                {renderRadioButtonList(props.attrList)}
            </RadioGroup>
        </FormControl>
    );
}
