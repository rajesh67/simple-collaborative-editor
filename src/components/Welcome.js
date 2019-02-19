import React, { Component } from 'react'
import { Jumbotron, Form, Label, Button, FormGroup, Col, Row, Input } from "reactstrap";

import { socket } from "../api/index";

import Users from './Users';

const channel = "editor";

export default class Welcome extends Component {
  constructor(props){
    super(props);
    this.state = {
        users : [],
        username : null,
        socketId : null
    }
    //Register our functions
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount(){
    //set socket id
    socket.emit("joinChannel", {
        channel : channel
    })

    // this.setState({socketId:socket.id})

    const ref=this;

    socket.on("userData", function(data) {
        ref.setState({
            users : data.users,
            socketId : data.socketId,
        });
        console.log("Welcome component");
        console.log(ref.state.users, ref.state.socketId);
        const currentUser = data.users[ref.state.socketId];
        ref.setState({username:currentUser});
        console.log("Current User :"+currentUser);
    });

    //Check users state if it contains the current session
    //if so, get the username
  }

  onChange(e){
      console.log(e.target.value);
      this.setState({username :e.target.value});
    //   console.log(this.state.username);
  }

  onClick(){
    //   e.preventDefault();
      //emit join user event
      // and add into the cookies
      socket.emit("joinUser", {
        channel : channel,
        username : this.state.username,
        socketId : socket.id
      });
      
      console.log(socket.id);
      console.log(this.state.username)
  }

  render() {
    
    const askForUsername = () => {
        // const socketId = cookie.load('socketId', {socketId: socket.id});
        const socketId = this.state.socketId;

        if(socketId==='undefined'){
            console.log("first condition");
            return (
            <div>   
                <Row>
                    <Col md={6} className="offset-md-3">
                        <Form>
                            <FormGroup>
                                {/* <Label for="name">Your full Name</Label> */}
                                <Input type="text" name="username" id="name" placeholder="Enter your full name" onChange={this.onChange}/>
                            </FormGroup>
                            <Button className="primary btn btn-md" onClick={this.onClick}>Start collaborating</Button>
                        </Form>
                    </Col>
                </Row>
                
            </div>
            )
        }else if(socketId===socket.id){
            console.log(socket.id);
            return (
                <div>
                    {/* <h1>username : {this.state.username}</h1> */}
                    <Users {...this.props} users={this.state.users} socketId={this.state.socketId} username={this.state.username}/>
                </div>
            );
        }else{
            
            return (
                <div>   
                <Row>
                    <Col md={6} className="offset-md-3">
                        <Form>
                            <FormGroup>
                                {/* <Label for="name">Your full Name</Label> */}
                                <Input type="text" name="username" id="name" placeholder="Enter your full name" onChange={this.onChange}/>
                            </FormGroup>
                            <Button className="primary btn btn-md" onClick={this.onClick}>Start collaborating</Button>
                        </Form>
                    </Col>
                </Row>
                
            </div>
            )
        }
    }

    return (
      <div className="Welcome">
        <Jumbotron>
        <h1 className="display-3">Hello, {this.state.username||'There'}!</h1>
        <p className="lead">{`Enter your name and start collaborating with other fellow users`||``}.</p>
        <hr className="my-2" />
        <p>User name is mandatory to verify, who you are?</p>
        
        {askForUsername()}
        <h5>Instructions:</h5>
                    <ul style={{listStyle:'none'}}>
                        <li>Assumption:  - Once mouse is entered into the textarea, it is taken as the user is still editing/typing into the editor, until or unless you tell the browser that I have finished my editing in the document, hereby I allow others to edit the document.</li>
                        <li style={{marginTop:50}}> To edit the document from another browser, "__You_Have_To_Click_Outside_THE_BLACK_BORDERED_LINE_ON_EDITOR". Only then the document is unlocked. </li>
                        
                    </ul>
      </Jumbotron>
      </div>
    )
  }
}
