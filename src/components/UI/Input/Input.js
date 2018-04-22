import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';

const Input = (props) => {

    const cssNamesArr = [props.inputCss];
    let cssNames;

    if (!props.valid && props.touched) {
        cssNamesArr.push("input-err");
    }

    if (!props.valid && props.touched && props.type === "checkbox") {
        cssNamesArr.push("checkbox-label--error");
    }    

    let input = null

    if (props.type === "checkbox") {
        cssNamesArr.push("checkbox-label");
        cssNames = cssNamesArr.join(" ");

        input = <React.Fragment>
                    <input 
                        onChange={props.changed}
                        checked={props.value}
                        type={props.type} 
                        name={props.name} 
                        id={props.name} />
                    <label className={cssNames} htmlFor={props.name}>Accept <Link to="/terms">terms</Link> of use.</label>
                </React.Fragment>
    }

    else if (props.type === "select") {
        cssNames = cssNamesArr.join(" ");

        input = 
            <React.Fragment>
                <label htmlFor={props.name}>{props.label}</label>
                <select value={props.value} id={props.name} name={props.name} onChange={props.changed}>
                    {props.options.map((value) => {
                            return <option key={value} value={value}>{value}</option>
                        })
                    }
                </select>
            </React.Fragment>
    }

    else if (props.type === "number") {
        cssNames = cssNamesArr.join(" ");

        input = <React.Fragment>
                    <label htmlFor={props.name}>{props.label}</label>
                        <div className="article__form__number-input">
                            <input 
                            min="0"
                            className ={cssNames}
                            type="text"
                            name={props.name} 
                            id={props.name} 
                            placeholder={props.placeholder} 
                            onChange={props.changed}
                            value={props.value} />
                        </div>
                </React.Fragment>
    }

    else if (props.type === "adding") {
        cssNames = cssNamesArr.join(" ");

        input = <React.Fragment>
                    <label htmlFor={props.name}>{props.label}</label>
                        <div className="article__form__number-input">
                            <input 
                            min="0"
                            className ={cssNames}
                            type="text"
                            name={props.name} 
                            id={props.name} 
                            placeholder={props.placeholder} 
                            onChange={props.changed}
                            value={props.value} />
                            <div className="article__form__number-buttons">
                                <Button clicked={() => props.addSkill(props.value)} css="control-btn"><i className="fas fa-plus"></i></Button>
                            </div>
                        </div>
                </React.Fragment>
    }

    else {
        cssNames = cssNamesArr.join(" ");

        input = <React.Fragment>
                    <label htmlFor={props.name}>{props.label}</label>
                    <input 
                    min="0"
                    className ={cssNames}
                    type={props.type} 
                    name={props.name} 
                    id={props.name} 
                    placeholder={props.placeholder} 
                    onChange={props.changed}
                    value={props.value} />
                </React.Fragment>
    }

    return (
        <div className={cssNames} >
            {input}
        </div>
    )
}

export default Input;