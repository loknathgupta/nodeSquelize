import React from 'react';
import Modal from 'react-responsive-modal';
import config, {axiosInstance} from '../../config/config';

class UserDeatils extends React.Component {
    constructor(props) {
        super(props);
        console.log('popup props', props);

        this.state = {
            open : false,
            userDetails : false
        };
        this.toggleModal = this.toggleModal.bind(this);
    }
    
    
    componentDidMount() {        
        axiosInstance().get(config.endpoint+'/user/list/'+this.props.userId)
        .then(response => {
            let userDetails = response.data[0];
            this.setState({
                userDetails : userDetails
            });
        });
    }
    
    toggleModal = () => {
        this.setState({ open: !this.state.open });
    }

    render() {
        return (
            <div className="float-left">
                <button className="btn btn-danger" onClick={this.toggleModal}> View </button>
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
                        {this.state.userDetails &&
                            <div> 
                                <div><img height="60px" src={config.endpoint + '/' + this.state.userDetails.dp} alt={this.state.userDetails.name + ' Profile Picture'}></img></div>
                                <div><b>User Name : </b> {this.state.userDetails.name}</div>
                                <div><b>User Email : </b> {this.state.userDetails.email}</div>
                                <div><b>Status : </b> {this.state.userDetails.status === 'E' ? 'Enabled' : (this.state.userDetails.status === 'B' ? 'Blocked' : 'Disabled')}</div>
                            </div>
                        }
                    </div>
                        
                    </div>
                </Modal>
            </div>
        );
    }
}

export default UserDeatils;