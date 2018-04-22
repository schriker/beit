import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';

import Filter from './Filter/Filter';
import OfferItem from './OfferItem/OfferItem';
import Spinner from '../../components/UI/Spinner/Spinner';
import Pagination from './Pagination/Pagination';
import PaginationItem from './Pagination/PaginationItem/PaginationItem';
import { withRouter } from 'react-router-dom';

class Offers extends Component {

    constructor(props) {   

        super(props);
        
        let {params} = this.props.match;

        this.state = {
            itemsPerPage: 10,
            filters: {
                level: params.exp ? params.exp : "all",
                stack: params.stack ? params.stack : "all",
                mainLanguage: params.lang ? params.lang : "all",
                city: params.city ? params.city : "all"
            },
            filterSetings: {
                level: {
                    selected: params.exp ? params.exp : "all",
                    options: [
                        "All",
                        "Junior",
                        "Mid",
                        "Senior"
                    ]
                },
                stack: {
                    selected: params.stack ? params.stack : "all",
                    options: [
                        "All",
                        "Frontend",
                        "Backend",
                        "Fullstack",
                        "UI/UX"
                    ]
                },
                mainLanguage: {
                    selected: params.lang ? params.lang : "all",
                    options: [
                        "All",
                        "HTML",
                        "JavaScript",
                        "PHP",
                        "C",
                        "Java",
                        "Net",
                        "Python",
                        "Ruby",
                        "Scala"
                    ]
                },
                city: {
                    selected: params.city ? params.city : "all",
                    options: [
                        "All",
                        "Warszawa",
                        "Kraków",
                        "Katowice",
                        "Gdańsk",
                        "Rzeszów",
                        "Szczecin",
                        "Lublin",
                        "Wrocław"
                    ]
                }
            }
        }
    }

    filterOffers = (value) => {
        let valid = true;

        for(let key in this.state.filters) {
            if (this.state.filters[key] !== "all") {
                valid = (this.state.filters[key] === value.data[key]) && valid;
            }
        }
        return valid;
    }

    filter = (id, value) => {

        if (value === "All") {
            value = "all"
        }

        const updatedFilters = {
            ...this.state.filters,
            [id]: value
        }

        const updatedOption = {
            ...this.state.filterSetings,
                [id]: { 
                    ...this.state.filterSetings[id],
                    selected: value
                }
        };

        this.setState({filters:updatedFilters, filterSetings:updatedOption});
        this.props.changePage(1);
    }
        
    render() {
        let offerContent = <Spinner />;
        let offerArr = [];

        let lastPage = 0;

        let prevPage = null;
        let nextPage = null;

        let firsItem = (this.props.currentPage * this.state.itemsPerPage) - this.state.itemsPerPage;
        let lastItem = (this.props.currentPage * this.state.itemsPerPage);

        if (this.props.fetchErr) {
            offerContent = <div className="page-error">Fetching error!</div>
        }

        if (this.props.offers) {

            for (let key in this.props.offers) {
                offerArr.push({
                    id: key,
                    data: this.props.offers[key]
                })
            }

            const filteredArr = offerArr.reverse().filter(this.filterOffers);

            if (filteredArr.length === 0) {
                offerContent = <div className="page-error">No results!</div>;
            }
            else {
                offerContent =
                    <ul>
                        {filteredArr.slice(firsItem, lastItem).map(offer => <OfferItem key={offer.id} offer={offer} />)}
                    </ul>;
            }
            lastPage = Math.ceil((filteredArr.length) / this.state.itemsPerPage);

            prevPage = this.props.currentPage > 1 ? 
                <PaginationItem 
                    page={+this.props.currentPage - 1} 
                    clicked = {(page) => this.props.changePage(page)}>
                        <i className="fas fa-angle-left"></i>
                </PaginationItem> 
                : <li><a className="pagination--disabled"><i className="fas fa-angle-left"></i></a></li>;

            nextPage =  this.props.currentPage < lastPage ?
                <PaginationItem 
                    page={+this.props.currentPage + 1} 
                    clicked = {(page) => this.props.changePage(page)}>
                        <i className="fas fa-angle-right"></i>
                </PaginationItem> 
                : <li><a className="pagination--disabled"><i className="fas fa-angle-right"></i></a></li>;
        }

        return (
            <React.Fragment>
                <div className="row justify-content-center">
                <Filter location={this.props.location.pathname} filter={(id, value) => this.filter(id, value)} data={this.state.filterSetings} />
                </div>
                <div className="row">
                    <main id="offers" className="offers">
                        {offerContent} 
                    </main>
                </div>
                <div className="row justify-content-center">
                    <ul className="pagination">
                        {prevPage}
                        <Pagination currentPage={this.props.currentPage} changePage={(page) => this.props.changePage(page)} lastPage={lastPage} />
                        {nextPage}
                    </ul>
                </div>
            </React.Fragment>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        currentPage: state.offers.page,
        offers: state.offers.offers,
        fetchErr: state.offers.offerErr
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changePage: (page) => dispatch(action.changePage(page))
    }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Offers));