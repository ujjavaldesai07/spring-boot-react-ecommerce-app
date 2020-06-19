import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default function RadioButtonsGroup(props) {
    const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const renderRadioButtonList = rbList => {
        if (!rbList) {
            return null
        }
        let count = 0
        return rbList.map(({id, type}) => {

            if (count === 4) {
                return null
            }
            count = count + 1

            return <FormControlLabel key={id}
                value={id}
                control={<Radio size="small"/>}
                label={type}/>
        })
    }

    return (
        <FormControl component="fieldset">
            <RadioGroup aria-label={props.title} name={props.title} value={value} onChange={handleChange}>
                {renderRadioButtonList(props.attributeList)}
            </RadioGroup>
        </FormControl>
    );
}
