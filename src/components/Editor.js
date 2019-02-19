import React, { Component } from 'react'
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import { subscribeToTimer, subscribeToLock, subscribeToUnLock, subscribeToEditing, socket } from '../api';


import { fetchData } from "../actions/EditorActions";

import '../styles/Editor.css';

const channel = "editor";

class Editor extends Component {

    componentWillMount(){
        this.props.fetchData()
    }

    constructor(props) {
        super(props)
        this.state = { 
            text: '',
            timestamp : 'No timestamp yet',
            message : 'Hello',
            readOnly : false,
            socketId : null,
            username : '',
        } 
        this.handleChange = this.handleChange.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    componentDidMount(){
        console.log(this.state.cookies);
        //join a socket channel
        socket.emit("joinChannel", {
            channel : channel
        })

        //Set text area to be editable
        this.setState({readOnly:false})

        const ref = this;
        let message = '';
        
        socket.on("message", function (data) {
            
            if(data.socketId!==socket.id){
                //Don't disable editor
                if (data.channel == channel) {
                    message = data.message;
                    console.log(message, data.socketId);
                    ref.setState({message:message});
                    ref.setState({text:message})
                    
                    if(data.lock){
                        ref.setState({readOnly:true});
                    }else{
                        ref.setState({readOnly:false})
                        ref.setState({text:data.message})
                    }
                }
                
            }else{
                ref.setState({message: data.message});
            }
            
        });
        
    }

    handleChange(value) {
        //set the text
        this.setState({ text: value })

        socket.emit("message", { 
            channel : channel,
            message: this.state.text,
            lock : true,
            socketId : socket.id
         });
        
    }

    handleKeyDown(index, length){
        // console.log("Key Down");
        socket.emit("message", { 
            channel : channel,
            message: this.state.text,
            lock : true,
            socketId : socket.id
         });

    }

    handleKeyUp(index, length){
        // console.log("Key UP");
        socket.emit("message", { 
            channel : channel,
            message: this.state.text,
            lock : false,
            socketId : socket.id
         });
    }

    render() {
    
        if(this.state.readOnly){
            return (
                <div className="Editor">
                    <h2>
                        Here's the TextEditor.
                    </h2>
                    <br />
                    
                    <ReactQuill value={this.state.message}
                        placeholder={this.state.message}
                        style={{height:500}} 
                        readOnly={this.state.readOnly} 
                        onFocus={this.handleKeyDown}
                        onBlur={this.handleKeyUp}
                        onChangeSelection={ref => console.log("")} />
                </div>
                
            )
        }else{
            return (
                <div className="Editor">
                    <h2>
                        Here's the TextEditor.
                    </h2>
                    
                    <ReactQuill value={this.state.text}
                        placeholder={this.state.message}
                        onChange={this.handleChange} 
                        style={{height:500}} 
                        readOnly={this.state.readOnly} 
                        onFocus={this.handleKeyDown}
                        onBlur={this.handleKeyUp}
                        onChangeSelection={ref => console.log("")} />
    
                    
                </div>
               
            )
        }
        
        
    }
}

Editor.propTypes = {
    fetchData : PropTypes.func.isRequired,
    data : PropTypes.object.isRequired,
    status : PropTypes.bool.isRequired
}

const mapStateToProps = state =>({
    data : state.editor.item,
    status : state.editor.status
})


export default connect(mapStateToProps, {fetchData})(Editor);