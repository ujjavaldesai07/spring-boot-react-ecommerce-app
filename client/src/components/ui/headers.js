import React from 'react';

export const NavBarHeader = (props) => {
    return (
        <p style={{fontSize: '1rem', fontWeight: 600}}>{props.title.toUpperCase()}</p>
    )
}
