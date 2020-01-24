import React from 'react';
import Modal from 'react-responsive-modal';
import userService from '../../Services/userService';
import { AvForm, AvField } from 'availity-reactstrap-validation';

class AddComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open : false,
            comment : false,
            errorMessage : false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.postComment = this.postComment.bind(this);
    }
    
    toggleModal = () => {
        this.setState({ open: !this.state.open });
    }
    postComment = (event, err, values) => {
        //this.toggleModal();
        if(err.length > 0){		
			return false;
		}
		//let formData = new FormData(document.getElementById('addForm'));
		userService.addComment(values)
		.then(data => {
			if(data.errors){
				this.setState({errorMessage : data.errors[0].message});
			}else{
				this.toggleModal();
			}
		})
		.catch(err => {
			console.log(err);
		});
    }

    render() {
        //alert('comment')
        return (
            <div>           
                <button className="btn btn-info" onClick={this.toggleModal}>Add Comment</button>      
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
                        <AvForm onSubmit={this.postComment} id="addForm">
                            <label>Add New Comment</label>
						    <AvField id="comment" name="comment" type="textarea" value={this.state.comment} validate={{required : {value:true}}}/>
                            <button className="btn btn-primary" >Save!</button>
                        </AvForm>
                        </div>
                        
                    </div>
                </Modal>
            </div>
        );
    }
}

export default AddComment;