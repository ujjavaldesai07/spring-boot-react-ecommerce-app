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
        activeText = modifiedOptions[value - 1].text
        setState({activeId: value, activeText})
    }

    return (
        <Menu compact>
            <StyledDropdown options={modifiedOptions}
                            simple item
                            id="customDropdown"
                            text={`Sort by: ${state.activeText ? state.activeText : modifiedOptions[0].text}`}
                            onChange={handleDropdownChange}
                            value={state.activeId}/>

        </Menu>

    )
}

export default DropdownSection