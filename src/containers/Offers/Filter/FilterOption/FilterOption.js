import React from 'react';
import { CSSTransition } from 'react-transition-group';

const FilterOption = (props) => {
    return(
        <CSSTransition in={props.show} timeout={200} classNames="fade" mountOnEnter unmountOnExit>
            <div className="app-filter__options">
                <div className="arrow arrow--position-select"></div>
                    <ul>
                        {props.options.map(option => <li onClick={() => props.clicked(props.id, option) } key={option}>{option}</li>)}
                    </ul>
            </div>
        </CSSTransition>
    )
}

export default FilterOption;