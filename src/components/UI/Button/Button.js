import React from 'react';

const Button = (props) => {
    return (
        <button type={props.type ? props.type : "button"} onClick={props.clicked} className={props.css}>
            {props.children}
        </button>
    )
}

export default Button;