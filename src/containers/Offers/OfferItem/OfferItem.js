import React from 'react';
import OfferIcon from '../OfferIcon/OfferIcon';
import { Link } from 'react-router-dom';

const OfferItem = (props) => {

    const date = (Date.parse(new Date()) - Date.parse(props.offer.data.timeStamp)) / 1000;
    const delButton = <span onClick={() => props.delItem(props.offer.id, props.offer.data)} className="article__skills__del offer-item__dell"><i className="fas fa-minus-circle"></i></span>

    return (
        <li>
            <Link className="offer-item" to={`/offer/${props.offer.id}`}>
                <div className="offer-item__title">
                    <OfferIcon page={"offer-item"} language={props.offer.data.mainLanguage} />
                    <div>
                        <div><span>{props.offer.data.level} - {props.offer.data.mainLanguage}</span> @ {props.offer.data.city}</div>
                        <div className="offer-item__stack">{props.offer.data.stack}</div>
                    </div>
                </div>
                <div className="offer-item__details">
                    <div className="offer-item__years">{props.offer.data.ageOfExp} {props.offer.data.ageOfExp > 1 ? "Years" : "Year" } experience</div>
                    <div className="offer-item__price">{props.offer.data.salaryFrom} - {props.offer.data.salaryTo} PLN</div>
                    {date > 86400 ? null : <div className="offer-item__new ">NEW</div>}
                </div>
            </Link>
            {props.isUserPage ? delButton : null}
        </li>
    )
}

export default OfferItem;