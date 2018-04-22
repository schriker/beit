import React from 'react';
import { CSSTransition } from 'react-transition-group';

const Modal = (props) => {
    return (
        <CSSTransition in={props.show} timeout={200} classNames="fade" unmountOnExit mountOnEnter>
            <div className="modal">
                <div onClick={props.close} className="modal"></div>
                <div className="modal__box">
                    <div className="modal__title">{props.title} <a onClick={props.close}><i className="fas fa-times"></i></a></div>
                    {props.children}
                </div>
            </div>
        </CSSTransition>
    )
}

export default Modal;