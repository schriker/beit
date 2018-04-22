import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from '../../../store/actions/index';

import Spinner from '../../../components/UI/Spinner/Spinner';
import OfferItem from '../../Offers/OfferItem/OfferItem';
import Modal from '../../../components/UI/Modal/Modal';
import Button from '../../../components/UI/Button/Button';
import ErrPage from '../../../components/ErrPage/ErrPage';

class UserOffers extends Component {

    state = {
        modal: false,
        selectedItemId: null,
        selectedItem: null
    }

    delItemHandler = (itemId, itemData) => {
        const title = `${itemData.level} - ${itemData.mainLanguage} @ ${itemData.city}`;
        this.setState({
            modal: true, 
            selectedItemId: itemId,
            selectedItem: title
        });
    }

    removeElement = () => {
        this.props.deleteOffer(this.state.selectedItemId, this.props.user.uid);
        this.closeModal();
    }

    closeModal = () => {
        this.setState({modal: false});
    }
    
    render() {

        let offerContent = <ErrPage>No offers posted yet.</ErrPage>;
        let offerArr = [];

        if(this.props.loading) {
            offerContent = <Spinner />;
        }

        else if(!this.props.user) {
            offerContent = <ErrPage>You're not logged in!</ErrPage>;
        }

        else if (this.props.userOffers) {
            for (let key in this.props.userOffers) {
                offerArr.push({
                    id: key,
                    data: this.props.userOffers[key]
                })
            }

            offerContent =
                <React.Fragment>
                    <Modal title="Are you sure?" show={this.state.modal} close={this.closeModal}>
                        <div className="wrapper">
                            <p className="text-center">{this.state.selectedItem}</p>
                            <div className="modal__buttons">
                                <Button clicked={() => this.removeElement()} css="green-btn">Remove<i className="fas fa-trash-alt"></i></Button>                            </div>
                        </div>
                    </Modal>
                    <ul>
                        {offerArr.reverse().map(offer => <OfferItem delItem={(itemId, itemData) => this.delItemHandler(itemId, itemData)} isUserPage key={offer.id} offer={offer} />)}
                    </ul>
                </React.Fragment>;
        }

        return (
            <div className="row">
                <main id="offers" className="offers">
                   {offerContent}
                </main>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.offers.loading,
        userOffers: state.offers.userOffers,
        user: state.auth.user
    }
}

const mapDispatchToProps = (dipstach) => {
    return {
        deleteOffer: (offerId, uid) => dipstach(action.deleteData(offerId, uid))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserOffers);