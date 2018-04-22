import React, { Component } from 'react';
import FilterOption from '../FilterOption/FilterOption';

class FilterItem extends Component {

    state = {
        expanded: false
    }

    toggleList() {
        this.setState({expanded: !this.state.expanded});
    }

    hideList() {
        this.setState({expanded: false});
    }

    render() {

        let selected = this.props.selected;

        if (this.props.selected === "all") {

            switch (this.props.id) {

                case "city":
                    selected = "City"
                    break;

                case "stack":
                    selected = "Stack"
                    break;

                case "mainLanguage":
                    selected = "Language"
                    break;

                case "level":
                    selected = "Experience"
                    break;

                default: return selected;
            }
        }

        return(
            <div onBlur={() => this.hideList()} className="app-filter__item">
                <div  onClick={() => this.toggleList()} className={this.props.selected === "all" ? "app-filter__name app-filter__name--not-selected" : "app-filter__name"} role="combobox" aria-expanded={this.state.expanded} aria-controls="" tabIndex="-1">
                    {selected}<i className="fas fa-angle-down"></i>
                </div>
                <FilterOption id={this.props.id} clicked={(id, value) => this.props.change(id, value)} show={this.state.expanded} options={this.props.options} />
            </div>
        )
    }
}

export default FilterItem;