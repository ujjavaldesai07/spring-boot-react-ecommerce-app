import styled from 'styled-components';
import {Button, Dimmer, Segment, Grid, Dropdown, Menu} from 'semantic-ui-react';

export const StyledSegment = styled(Segment)({
    border: 'none !important',
    margin: '0 !important',
    padding: '0 !important',
});

export const StyledDimmer = styled(Dimmer)({
    padding: '0 !important',
    backgroundColor: 'rgba(0,0,0,0.2) !important',
});

export const StyledWebButton = styled(Button)({
    width: '100% !important',
    height: '40px !important'
});

export const StyledLargeDropdown = styled(Dropdown)({
    width: "225px"
});

export const StyledSmallMenu = styled(Menu)({
    minHeight: "inherit !important",
    minWidth: "inherit !important",
    width: "inherit !important",
});

export const StyledSmallDropdown = styled(Dropdown)({
    width: "60px",
    height: "inherit !important",
    maxHeight: "17px !important",
    fontSize: "0.8rem",
    padding: "2px !important"
});