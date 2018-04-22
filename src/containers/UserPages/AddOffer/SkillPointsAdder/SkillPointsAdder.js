import React, { Component } from  'react';

class SkillPointsAdder extends Component {

    state = {
        points: this.props.points
    }

    onPointHover = (point) => {
        this.setState({points: point})
    }

    onMouseOut = () => {
        this.setState({points: this.props.points})
    }

    render() {
        const points = [];

        if (this.state.points <= 5) {
            for (let i=0; i < this.state.points; i++) {
                points.push(<li onClick={() => this.props.changeSkillPoints(this.props.name, i+1)} onMouseOut={() => this.onMouseOut()} onMouseOver={() => this.onPointHover(i+1)} key={"yes-"+i} className="article__skills__points--yes"></li>);
            }
            for (let i=this.state.points; i < 5; i++) {
                points.push(<li onMouseOut={() => this.onMouseOut()} onMouseOver={() => this.onPointHover(i+1)} key={"not-"+i} className="article__skills__points--not"></li>);  
            }
        }
    

    
        return(
            <div className="article__skills__item">
                {this.props.name}
                <ul className="article__skills__points article__skills__points--adder">
                    {points}
                </ul>
                <span onClick={() => this.props.delSkill(this.props.name)} className="article__skills__del"><i className="fas fa-minus-circle"></i></span>
            </div>
        )
    }
}

export default SkillPointsAdder;