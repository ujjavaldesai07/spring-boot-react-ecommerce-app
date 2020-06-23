import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default function RadioButtonsGroup(props) {
    const handleChange = (event) => {
        for(let i = 0; i < props.attributeList.length; i++) {
            if(event.target.value[0] === props.attributeList[i].type[0]) {
                props.onChangeHandler(props.attributeList[i].id)
                return
            }
        }
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
                        value={props.selectedAttributeId.length > 0 && props.attributeList[props.selectedAttributeId-1]?
                            props.attributeList[props.selectedAttributeId-1].type: false}
                        onChange={handleChange}>
                {renderRadioButtonList(props.attributeList)}
            </RadioGroup>
        </FormControl>
    );
}
