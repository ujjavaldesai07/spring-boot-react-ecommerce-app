import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default function RadioButtonsGroup() {
    const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                <FormControlLabel value="Men" control={<Radio size="small"/>} label="Men" />
                <FormControlLabel value="Women" control={<Radio size="small"/>} label="Women" />
                <FormControlLabel value="Boys" control={<Radio size="small"/>} label="Boys" />
                <FormControlLabel value="Girls" control={<Radio size="small"/>} label="Girls" />
            </RadioGroup>
        </FormControl>
    );
}
