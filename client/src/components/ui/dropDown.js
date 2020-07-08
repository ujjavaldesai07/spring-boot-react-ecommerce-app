import React from 'react'
import {Menu} from 'semantic-ui-react'
import {
    StyledLargeDropdown,
    StyledSmallDropdown,
    StyledSmallMenu
} from "../../styles/semanticUI/customStyles";
import "../../styles/semanticUI/commonStyles.css"
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

    const handleDropdownChange = (e, {id, value}) => {
        log.info(`[DropdownSection]: handleDropdownChange`)
        props.onChangeHandler(value, optionList[value - 1].text, id.split("-")[0])
    }

    const renderLargeDropdown = () => {
        return (
            <Menu compact>
                <StyledLargeDropdown options={optionList}
                                     simple item
                                     id={`${props.title}-dropdown`}
                                     text={`${props.appendText} ${props.selectedValue.value ? props.selectedValue.value
                                         : optionList ? optionList[0].text : null}`}
                                     onChange={handleDropdownChange}
                                     value={props.selectedValue.id}/>

            </Menu>
        )
    }

    const renderSmallDropdown = () => {
        return (
            <StyledSmallMenu compact>
                <StyledSmallDropdown options={optionList}
                                     simple item
                                     id={`${props.title}-dropdown`}
                                     text={`${props.appendText} ${props.selectedValue.value ? props.selectedValue.value
                                         : optionList ? optionList[0].text : null}`}
                                     onChange={handleDropdownChange}
                                     value={props.selectedValue.id}/>
            </StyledSmallMenu>
        )
    }

    log.debug(`[DropdownSection]: Rendering DropdownSection Component`)
    return (
        <>
            {props.size && props.size.localeCompare("sm") === 0? renderSmallDropdown(): renderLargeDropdown()}
        </>
    )
}

export default DropdownSection