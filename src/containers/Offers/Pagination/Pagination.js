import React, { Component } from 'react';
import PaginationItem from './PaginationItem/PaginationItem';

class Pagination extends Component {

    render() {
        return (
            <React.Fragment>
                {[...Array(this.props.lastPage)].map((i, index) => {
                        return <PaginationItem 
                                    css={ +this.props.currentPage === index+1 ? "active" : null} 
                                    clicked={(page) => this.props.changePage(page)} 
                                    key={index+1} 
                                    page={index+1}>
                                    {index+1}
                                </PaginationItem>
                    })
                }       
            </React.Fragment>
        )
    }
}

export default Pagination;