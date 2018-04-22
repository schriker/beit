import React, { Component } from 'react';
import { onChange, setTouched } from '../../../utility/onInputChange';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import * as action from '../../../store/actions/index';
 
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import ErrPage from '../../../components/ErrPage/ErrPage';
import Modal from '../../../components/UI/Modal/Modal';
import CvIcon from '../../../images/cv.png';
import SkillPointsAdder from './SkillPointsAdder/SkillPointsAdder';
import RichTextEditor from 'react-rte';

class AddOffer extends Component {

    state = {
        modal: false,
        loginForm: {
            author: {
                label: "Name",
                type: "text",
                placeholder: "Your name",
                value: "",
                valid: false,
                touched: false
            },
            contactMail: {
                label: "E-Mail",
                type: "email",
                placeholder: "Your e-mail adress",
                value: "",
                valid: false,
                touched: false
            },
            age: {
                label: "Age",
                type: "number",
                placeholder: 0,
                value: "",
                valid: false,
                touched: false
            },
            city: {
                label: "City",
                type: "select",
                placeholder: "City",
                value: "Warszawa",
                options: [
                    "Warszawa",
                    "Kraków",
                    "Katowice",
                    "Gdańsk",
                    "Rzeszów",
                    "Szczecin",
                    "Lublin",
                    "Wrocław"
                ],
                valid: true,
                touched: false
            },
            ageOfExp: {
                label: "Years of experience",
                type: "number",
                placeholder: 0,
                value: "",
                valid: false,
                touched: false
            },
            level: {
                label: "Level of experience",
                type: "select",
                placeholder: "Experience",
                value: "Junior",
                options: [
                    "Junior",
                    "Mid",
                    "Senior"
                ],
                valid: true,
                touched: false
            },
            mainLanguage: {
                label: "Main language",
                type: "select",
                placeholder: "Language",
                value: "HTML",
                options: [
                    "HTML",
                    "JavaScript",
                    "PHP",
                    "C",
                    "Java",
                    "Net",
                    "Python",
                    "Ruby",
                    "Scala"
                ],
                valid: true,
                touched: false
            },
            stack: {
                label: "Stack",
                type: "select",
                placeholder: "Stack",
                value: "Frontend",
                options: [
                    "Frontend",
                    "Backend",
                    "Fullstack",
                    "UI/UX"
                ],
                valid: true,
                touched: false
            },
            salaryFrom: {
                label: "Minimum salary",
                type: "number",
                placeholder: 0,
                value: "",
                valid: false,
                touched: false
            },
            salaryTo: {
                label: "Maximum salary",
                type: "number",
                placeholder: 0,
                value: "",
                valid: false,
                touched: false
            },
            linkedIn: {
                label: "LinkedIn",
                type: "text",
                placeholder: "http://",
                value: "",
                valid: false,
                touched: false
            },
            github: {
                label: "Github",
                type: "text",
                placeholder: "http://",
                value: "",
                valid: false,
                touched: false
            },
            website: {
                label: "Portfolio",
                type: "text",
                placeholder: "http://",
                value: "",
                valid: false,
                touched: false
            },
            addSkill: {
                label: "Add skill",
                type: "adding",
                placeholder: "eg. React, Angular, Scrum...",
                value: "",
                valid: false,
                touched: false
            }
        },
        skills: {},
        editor: {
            value: RichTextEditor.createEmptyValue(),
            valid: false
        },
        isFormValid: false,
        errMsg: null
    }

    componentWillUnmount = () => {
        this.props.fetchData();
        this.props.authStateChange();
        this.props.clearData();
    }

    onEditorChange = (value) => {
        const editor = {
            ...this.state.editor,
            value: value
        }
        this.setState({editor: editor});
    }

    onInputChange = (event, elementId) => {
        const formData = onChange(this.state, event, elementId);
        
        let formValid = true;

        for ( let key in formData ) {
            formValid = formData[key].valid && formValid;
        }

        if (formValid) {
            let errMsg = null;
            this.setState({errMsg});
        }

        this.setState({loginForm: formData, isFormValid: formValid})
    }

    addSkill = (name) => {
        if (name.length >= 2) {
            const skills = {
                ...this.state.skills,
                [name]: 5
            }

            const formData = {
                ...this.state.loginForm,
                addSkill: {
                    ...this.state.loginForm.addSkill,
                    value: ""
                }
            };
            
            this.setState({skills: skills, loginForm: formData});
        }
    }

    delSkill = (name) => {
        const skills = {
            ...this.state.skills
        }
        delete skills[name];
        this.setState({skills: skills});
    }

    changeSkillPoints = (name, points) => {
        const skills = {
            ...this.state.skills,
            [name]: points
        }

        this.setState({skills: skills})
    }

    closeModal = () => {
        this.setState({modal: false});
    } 

    onFormSubmit = (event) => {
        event.preventDefault();

        let data = {
            skills: { 
                ...this.state.skills
            },
            body: this.state.editor.value.toString('html'),
            timeStamp: new Date()
        };

        for(let key in this.state.loginForm) {
            data = {
                ...data,
                [key]: this.state.loginForm[key].value
            }
        }

        if(this.state.isFormValid) {
            this.props.postData(data, this.props.user.uid);   
            this.setState({modal: true});
        }
        else {
            const formData = setTouched(this.state);
            let errMsg = "Please fill all the fields!";
            this.setState({errMsg: errMsg, loginForm: formData});
        }
    }

    renderInputElement = (element) => {
        return(
            <Input 
                inputCss="article__form__line"
                key={element.id}
                name={element.id}
                valid = {element.options.valid}
                touched = {element.options.touched}
                label={element.options.label}
                type={element.options.type}
                value={element.options.value}
                placeholder={element.options.placeholder}
                changed={(event) => this.onInputChange(event, element.id)}
                options={element.options.options}
                addSkill={(name) => this.addSkill(name)}
            />
        )
    }

    render() {
        const toolbarConfig = {
            display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', null, 'HISTORY_BUTTONS'],
            INLINE_STYLE_BUTTONS: [
              {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
              {label: 'Italic', style: 'ITALIC'},
              {label: 'Underline', style: 'UNDERLINE'}
            ],
            BLOCK_TYPE_DROPDOWN: [
              {label: 'Normal', style: 'unstyled'},
              {label: 'Heading Large', style: 'header-one'},
              {label: 'Heading Medium', style: 'header-two'},
              {label: 'Heading Small', style: 'header-three'}
            ],
            BLOCK_TYPE_BUTTONS: [
              {label: 'UL', style: 'unordered-list-item'},
              {label: 'OL', style: 'ordered-list-item'}
            ]
        }

        const formElementsArr = [];

        for (let key in this.state.loginForm) {
            formElementsArr.push({
                id: key,
                options: this.state.loginForm[key]
            });
        }
        
        const skillsArr = [];

        for (let key in this.state.skills)
            {
                skillsArr.push({
                    name: key,
                    points: this.state.skills[key]
                })
            }

        let skills = null;

        if (Object.keys(this.state.skills).length > 0) {
            skills = 
                <section className="article__skills">
                    {
                        skillsArr.map((skill, index) => {
                            return (
                                <SkillPointsAdder 
                                    changeSkillPoints={(name, points) => this.changeSkillPoints(name, points)} 
                                    delSkill={(name) => this.delSkill(name)} 
                                    key={index} name={skill.name} 
                                    points={skill.points} 
                                />
                            )
                        })
                    }
                </section>
        }

        const posted = 
            <div className="modal__form">
                <div className="text-center">
                    <img alt="" width="128px" src={CvIcon} />
                </div>
                <div className="modal__buttons">
                    { this.props.offerId ? 
                        <Link to={`/offer/${this.props.offerId}`}>
                            <Button css="green-btn">Check it<i className="fas fa-sign-in-alt"></i></Button>
                        </Link> 
                    : null }
                    <Link to="/"><Button css="purple-btn">Homepage<i className="fas fa-home"></i></Button></Link>
                </div>
            </div>

        let submitForm = 
            <React.Fragment>
                <form className="article__form" onSubmit={this.onFormSubmit}>
                    <section className="article__content">
                        <h3 className="no-margin">Personal Info</h3>
                        {formElementsArr.slice(0,4).map((element) => this.renderInputElement(element))}
                    </section>
                    <section className="article__content">
                        <h3>Experience</h3>
                        {formElementsArr.slice(4,13).map((element) => this.renderInputElement(element))}
                    </section>
                    <section className="article__content">
                        <h3>Skills</h3>
                        {formElementsArr.slice(13,14).map((element) => this.renderInputElement(element))}
                    </section>
                        {skills}
                    <section className="article__text-editor">
                        <h3>About Me</h3>
                        <RichTextEditor
                        toolbarConfig={toolbarConfig}
                            value={this.state.editor.value}
                            onChange={this.onEditorChange}
                        />
                    </section>
                    <div className="article__form__buttons">
                        <Button type="submit" css="green-btn">Submit <i className="fab fa-telegram-plane"></i></Button>
                    </div>
                </form>
                <div className="modal__err">
                                {this.state.errMsg}
                </div>
            </React.Fragment>

        if(!this.props.user) {
            submitForm = <ErrPage>You're not logged in!</ErrPage>
        }

        return(
            <React.Fragment>
                <div className="row">
                    <main className="article">
                        <Modal title={this.props.loading ? "Sending..." : "Offer posted"} show={this.state.modal} close={() => this.closeModal()}>
                            {this.props.loading ? <Spinner /> : null}
                            {this.props.posted ? posted : null}
                        </Modal>
                        {submitForm}
                    </main>
                </div>
            </React.Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        postData: (data, uid) => dispatch(action.postData(data, uid)),
        clearData: () => dispatch(action.postDataClear()),
        fetchData: () => dispatch(action.fetchData()),
        authStateChange: () => dispatch(action.authStateChange())
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        offerId: state.offers.offerId,
        loading: state.offers.loading,
        sending: state.offers.sending,
        posted: state.offers.posted
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddOffer));