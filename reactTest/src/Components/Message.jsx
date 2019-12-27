import React, { Component } from "react";

export default class Message extends Component {
 constructor(props) {
    super(props);
    this.state = {
      count : 0
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = ()=> {
    this.setState({ count: this.state.count + 1 });
  }

  componentDidMount(){
    
  }

  componentWillUnmount(){
      console.log('componentWillUnmount');
  }


  
  render() {
    return(
      <div>
        <div>
            Hello {this.props.user.name}! Having Age {this.props.user.age}
          </div>
          <div>
            <p>You clicked {this.state.count} times</p>
            <button onClick={this.handleClick}>
              Click me
            </button>
        </div>
      </div>
    );
  }
}
