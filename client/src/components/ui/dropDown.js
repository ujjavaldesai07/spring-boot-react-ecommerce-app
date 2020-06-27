import React from 'react'
import {Menu} from 'semantic-ui-react'
import {StyledDropdown} from "../../styles/semanticUI/customStyles";
import log from "loglevel";

const DropdownSection = props => {

    if (!props.attrList) {
        log.debug(`[DropdownSection]: props.options = ${props.attrList}`)
        return null
    }

    let optionList = props.attrList.map(({id, type}) => {
        log.trace(`[DropdownSection]: modifiedOptions id = ${id}, type = ${type}`)
        return {
            key: id,
            text: type,
            value: id
        }
    })

    const handleDropdownChange = (e, {value}) => {
        log.debug(`[DropdownSection]: handleDropdownChange`)
        props.onChangeHandler(value, optionList[value - 1].text)
    }

    log.debug(`[DropdownSection]: Rendering DropdownSection Component props.selectedValue.value = ${props.selectedValue.value}`)
    return (
        <Menu compact>
            <StyledDropdown options={optionList}
                            simple item
                            id="customDropdown"
                            text={`Sort by: ${props.selectedValue.value? props.selectedValue.value
                                : optionList ? optionList[0].text : null}`}
                            onChange={handleDropdownChange}
                            value={props.selectedValue.id}/>

        </Menu>

    )
}

export default DropdownSection