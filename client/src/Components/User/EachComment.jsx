import React, { Component } from 'react';
import Moment from 'react-moment';
class EachComment extends Component {
    constructor(props){
        super(props);
        console.log('comments', props);
        this.state = {
            comment : props.comment
        }
    }

    render() {
        return (
            <div>
                <div>
                    <Moment format="YYYY-MM-DD HH-mm-ss">
                        {this.state.comment.createdAt}
                    </Moment>                    
                </div>
                <div>{this.state.comment.comment}</div>
                <hr />
            </div>
        );
    }
}
export default EachComment;
