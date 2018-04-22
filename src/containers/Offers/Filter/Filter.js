import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import FilterItem from './FilterItem/FilterItem';

class Filter extends Component {

    render() {
        let optionsArr = [];

        for(let key in this.props.data) {
            optionsArr.push({
                id: key,
                selected: this.props.data[key].selected,
                options: this.props.data[key].options
            })
        }

        let redirectPath = '/';

        if (this.props.data.level.selected !== "all") {
            redirectPath = `/${this.props.data.level.selected}`;
        }
        if (this.props.data.stack.selected !== "all") {
            redirectPath = `/${this.props.data.level.selected}/${this.props.data.stack.selected}`;
        }
        if (this.props.data.mainLanguage.selected !== "all") {
            redirectPath = `/${this.props.data.level.selected}/${this.props.data.stack.selected}/${this.props.data.mainLanguage.selected}`;
        }
        if (this.props.data.city.selected !== "all") {
            redirectPath = `/${this.props.data.level.selected}/${this.props.data.stack.selected}/${this.props.data.mainLanguage.selected}/${this.props.data.city.selected}`;
        }

        let redirect = null;

        if (this.props.location !== redirectPath) {
            redirect = <Redirect to={redirectPath} />
        }

        return(
            <div className="app-filter">
                {optionsArr.map((item) => {
                        return <FilterItem change={(id, value) => this.props.filter(id, value)} id={item.id} key={item.id} selected={item.selected} options={item.options} />       
                    })
                }
                <div className="circle-shape"></div>
                <div className="square-shape"></div>
                <div className="square-shape-2"></div>
                <div className="triangle-shape"></div>
                {redirect}
            </div>
        )
    }
}

export default Filter;