import React, { Component } from "react";
import Message from './Message';
// import FunctionComponent from './FunctionComponent'; 

export default class Hello extends Component {
 constructor(props) {
    super(props);
    this.state = {
      user : {name: 'Rohan'},
      currentTime : new Date().toLocaleTimeString()
    }
  }

  tickTime = () => {
    this.setState({currentTime : new Date().toLocaleTimeString()});
  }

  componentDidMount(){    
    this.timer = setInterval(() => {
      this.tickTime();
    }, 1000);

    this.setState({
      user : {name: 'Loknath', age :28}
    });
  }

  componentWillUnmount(){
    console.log('hello componentWillUnmount');
    clearInterval(this.timer);   
  }

  componentDidCatch(error, info){
    console.log(error)
  }


  
  render() {
    return(
      <div className="card card-plain">        
        <div className="App">
            Current Time is {this.state.currentTime}
            <Message user = {this.state.user}/>
            {/* <FunctionComponent /> */}
        </div>

    </div>
    )
  }
}
