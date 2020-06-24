import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default function RadioButtonsGroup(props) {
    const handleChange = (event) => {
        props.onChangeHandler(event.target.value)
    };

    const renderRadioButtonList = rbList => {
        if (!rbList) {
            return null
        }
        return rbList.map(({id, type}) => {
            return <FormControlLabel key={id}
                                     value={type}
                                     control={<Radio size="small"/>}
                                     label={type}/>
        })
    }

    console.log("Calling RadioButtonsGroup....")

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
