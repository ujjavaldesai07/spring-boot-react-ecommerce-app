import React, {useState} from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import {useSelector} from "react-redux";

export default function RadioButtonsGroup(props) {
    const [value, setValue] = useState(0)
    const selectedFilterAttributes = useSelector(state => state.selectedFilterAttributesReducer)

    const handleChange = (event) => {
        for(let i = 0; i < props.attributeList.length; i++) {
            if(event.target.value[1] === props.attributeList[i].type[1] &&
                event.target.value.localeCompare(props.attributeList[i].type) === 0) {
                props.onChangeHandler(props.attributeList[i].id)
                break;
            }
        }
        // setValue(event.target.value);
        // props.onChangeHandler(event.target.value, findValue)
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

    console.log( "MyValue == " + selectedFilterAttributes.gender? selectedFilterAttributes.gender.value: undefined)
    return (
        <FormControl component="fieldset">
            <RadioGroup aria-label={props.title} name={props.title}
                        value={selectedFilterAttributes.gender? selectedFilterAttributes.gender.value: null}
                        onChange={handleChange}>
                {renderRadioButtonList(props.attributeList)}
            </RadioGroup>
        </FormControl>
    );
}
