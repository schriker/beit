import React from 'react';
import java from './src/java.png';
import net from './src/net.png';
import ruby from './src/ruby.png';
import scala from './src/scala.png';
import php from './src/php.png'

const OfferIcon = (props) => {

    let icon = null;
    let iconCSS = props.language.toLowerCase();

    switch(iconCSS) {

        case "html":
            icon = <i className="fab fa-html5"></i>;
        break;

        case "javascript":
            icon = <i className="fab fa-js-square"></i>;
        break;

        case "php":
            icon = <img src={php} alt=""/>;
        break;

        case "c":
            icon = "C";
        break;

        case "java":
            icon = <img src={java} alt=""/>;
        break;

        case "net":
            icon = <img src={net} alt=""/>;
        break;

        case "python":
            icon = <i className="fab fa-python"></i>;
        break;

        case "ruby":
            icon = <img src={ruby} alt=""/>;
        break;

        case "scala":
            icon = <img src={scala} alt=""/>;
        break;

        default: icon = null;
    }

    return (
        <React.Fragment>
            <div className={`${props.page}__icon offer-item__icon--${iconCSS}`}>{icon}</div>
        </React.Fragment>
    )
}

export default OfferIcon;