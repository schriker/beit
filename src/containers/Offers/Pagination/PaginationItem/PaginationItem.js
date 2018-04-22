import React from 'react';

const PaginationItem = (props) => {
    return (
        
        <li className={props.css}><a onClick={() => props.clicked(props.page)}>{props.children}</a></li>
    )
}

export default PaginationItem;