import React from 'react';
import Popup from "reactjs-popup";
import config, {axiosInstance} from '../config/config';

class UserDeatils extends React.Component {
    constructor(props) {
        super(props);
        console.log('popup props', props);

        this.state = {
            open : props.show,
            userDetails : false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }
    
    
    componentWillReceiveProps(props) {
        console.log('popup nw props', props);
        this.setState({
            open : props.show
        });
        if(props.userSelected){
			axiosInstance().get(config.endpoint+'/user/list/'+props.userSelected)
			.then(response => {
                let userDetails = response.data[0];
				this.setState({
					userDetails : userDetails
				});
			});
		}
    }

    openModal() {
        this.setState({ open: true });
        console.log(document.body);
    }
    closeModal() {
        this.setState({ open: false });
        this.props.hideDetailPopup();
    }

    render() {
        return (
            <div>
                {/* <button className="button" onClick={this.openModal}>
                    Controlled Popup
                </button> */}
                <Popup
                    open={this.state.open}
                    // closeOnDocumentClick
                    onClose={this.closeModal}
                >
                    <div className="modalf">
                        <span className="close" onClick={this.closeModal}>
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
                </Popup>
            </div>
        );
    }
}

export default UserDeatils;