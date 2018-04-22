import React from  'react';

const SkillPoints = (props) => {

    const points = [];

    if (props.points <= 5) {
        for (let i=0; i < props.points; i++) {
            points.push(<li key={"yes-"+i} className="article__skills__points--yes"></li>);
        }
        for (let i=props.points; i < 5; i++) {
            points.push(<li key={"not-"+i} className="article__skills__points--not"></li>);  
        }
    }

    return(
        <div className="article__skills__item">
            {props.name}
            <ul className="article__skills__points">
                {points}
            </ul>
        </div>
    )
}

export default SkillPoints;