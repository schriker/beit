import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import OfferIcon from '../OfferIcon/OfferIcon';
import SkillsPoints from './SkillsPoints/SkillsPoints';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

class OfferDetail extends Component {
    render() {

        let offerContent = <Spinner />;

        if(this.props.offer)
        {
            const data = this.props.offer[this.props.match.params.id];
            const skillsArr = [];
            for (let key in data.skills)
                {
                    skillsArr.push({
                        name: key,
                        points: data.skills[key]
                    })
                }

            const aboutText = {
                __html: data.body
            }
            
            offerContent = 
                <article>
                    <header className="article__header">
                        <div className="article__title">
                            <OfferIcon page={"article"} language={data.mainLanguage} />
                            <div className="article__name">
                                <h2>{data.author} - {data.level} {data.stack} {data.mainLanguage}</h2>
                                <div className="article__autohor-detials">{data.age} Years - {data.ageOfExp} {data.ageOfExp > 1 ? "Years" : "Year"} exp.<span> @ {data.city}</span></div>
                            </div>
                        </div>
                        <div className="article__social-icons">
                            <a href={data.linkedIn}><i className="fab fa-linkedin"></i></a><a href={data.github}><i className="fab fa-github-square"></i></a>
                        </div>
                        <div className="article__price">
                            <div>{data.salaryFrom} - {data.salaryTo} PLN</div>
                            <form action={`mailto:${data.contactMail}`}>
                                <Button type="submit" css="green-btn">Contact {data.author}</Button> 
                            </form>
                        </div>
                    </header>
                    <section className="article__skills">
                        {
                            skillsArr.map((skill, index) => {
                                return <SkillsPoints key={index} name={skill.name} points={skill.points} />
                            })
                        }
                    </section>
                    <section className="article__content">
                        <h3>About Me</h3>
                        <div dangerouslySetInnerHTML={aboutText}></div> 
                    </section>
                </article>

        }
        return(
            <div className="row">
                <main className="article">
                    {offerContent}
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        offer: state.offers.offers
    }
}

export default withRouter(connect(mapStateToProps)(OfferDetail));