import React, {useState} from 'react'
import {Menu} from 'semantic-ui-react'
import {StyledDropdown} from "../../styles/semanticUI/customStyles";

const DropdownSection = props => {

    const [state, setState] = useState({activeId: 1, activeText: undefined})
    let activeText

    if (!props.options) {
        return null
    }

    let modifiedOptions = props.options.map(({id, type}) => {
        return {
            key: id,
            text: type,
            value: id
        }
    })

    const handleDropdownChange = (e, {value}) => {
        // activeText = modifiedOptions[value - 1].text
        // setState({activeId: value, activeText})
        props.onChangeHandler(value, modifiedOptions[value - 1].text)
    }

    return (
        <Menu compact>
            <StyledDropdown options={modifiedOptions}
                            simple item
                            id="customDropdown"
                            // text={`Sort by: ${state.activeText ? state.activeText
                            //     : modifiedOptions ? modifiedOptions[0].text : null}`}
                            text={`Sort by: ${props.activeInfo[1] ? props.activeInfo[1]
                                : modifiedOptions ? modifiedOptions[0].text : null}`}
                            onChange={handleDropdownChange}
                            // value={state.activeId}/>
                            value={props.activeInfo[0]}/>

        </Menu>

    )
}

export default DropdownSection