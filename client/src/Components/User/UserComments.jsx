import React from 'react';
import Modal from 'react-responsive-modal';
import EachComment from './EachComment';

class UserComments extends React.Component {
    constructor(props) {
        // console.log('props dddd', props);
        super(props);
        this.state = {
            open : false,
            comments : props.comments
        };
        this.toggleModal = this.toggleModal.bind(this);
    }
    
    toggleModal = () => {
        this.setState({ open: !this.state.open });
    }

    render() {
        return (
            <div className="float-left">
                <button className="btn btn-danger" onClick={this.toggleModal}> Comments </button>
                <Modal
                    open={this.state.open}
                    onClose={this.toggleModal}
                    closeOnEsc = {false}
                    closeOnOverlayClick = {false}
                >
                    <div className="modalf">
                        <span className="close" onClick={this.toggleModal}>
                            &times;
                        </span>
                        <div className="popupBody" id="popupBody">
                            <h4>Comments</h4>
                            { this.state.comments.length > 0 ?
                            (this.state.comments.map((comment, i)=> <EachComment key={i} comment={comment}/>))
                            : <div>No Comments yet.</div>
                            }
                        </div>
                        
                    </div>
                </Modal>
            </div>
        );
    }
}

export {UserComments as default};