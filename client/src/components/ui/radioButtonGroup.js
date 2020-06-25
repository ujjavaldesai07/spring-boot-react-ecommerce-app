import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import log from "loglevel";

export default function RadioButtonsGroup(props) {

    const handleChange = (event) => {
        log.debug(`[RadioButtonsGroup]: handleChange event.target.value = ${event.target.value}`)
        props.onChangeHandler(event.target.value)
    };

    const renderRadioButtonList = rbList => {
        if (!rbList) {
            log.debug(`[RadioButtonsGroup]: rbList is null`)
            return null
        }

        log.debug(`[RadioButtonsGroup]: rbList = ${JSON.stringify(rbList)}`)

        return rbList.map(({id, type}) => {
            return <FormControlLabel key={id}
                                     value={type}
                                     control={<Radio size="small"/>}
                                     label={type}/>
        })
    }

    log.trace(`[RadioButtonsGroup]: props.attrList = ${props.attrList}`)
    log.debug(`[RadioButtonsGroup]: props.selectedValue = ${props.selectedValue}`)
    log.info(`[RadioButtonsGroup]: Rendering RadioButtonsGroup Component`)

    return (
        <FormControl component="fieldset">
            <RadioGroup aria-label={props.title} name={props.title}
                        value={props.selectedValue}
                        onChange={handleChange}>
                {renderRadioButtonList(props.attrList)}
            </RadioGroup>
        </FormControl>
    );
}
