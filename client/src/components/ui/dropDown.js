import React from 'react'
import {Menu} from 'semantic-ui-react'
import {StyledDropdown} from "../../styles/semanticUI/customStyles";
import log from "loglevel";

const DropdownSection = props => {

    if (!props.options) {
        log.debug(`[DropdownSection]: props.options = ${props.options}`)
        return null
    }

    let modifiedOptions = props.options.map(({id, type}) => {
        log.trace(`[DropdownSection]: modifiedOptions id = ${id}, type = ${type}`)
        return {
            key: id,
            text: type,
            value: id
        }
    })

    const handleDropdownChange = (e, {value}) => {
        log.debug(`[DropdownSection]: handleDropdownChange`)
        props.onChangeHandler(value, modifiedOptions[value - 1].text)
    }

    log.debug(`[DropdownSection]: props.activeInfo = ${JSON.stringify(props.activeInfo)}`)
    log.info(`[DropdownSection]: Rendering DropdownSection Component`)
    return (
        <Menu compact>
            <StyledDropdown options={modifiedOptions}
                            simple item
                            id="customDropdown"
                            text={`Sort by: ${props.activeInfo[1] ? props.activeInfo[1]
                                : modifiedOptions ? modifiedOptions[0].text : null}`}
                            onChange={handleDropdownChange}
                            value={props.activeInfo[0]}/>

        </Menu>

    )
}

export default DropdownSection