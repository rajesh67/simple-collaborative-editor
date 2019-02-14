import React, { Component } from 'react'
import Avatar, { ConfigProvider } from 'react-avatar';

import { socket } from "../api/index";

export default class Users extends Component {

    constructor(props){
        super(props);
        this.state = {
            users : [],
            username : '',
            socketId : null
        }

        this.dictToListUsers = this.dictToListUsers.bind(this);
        this.fetchUsers = this.fetchUsers.bind(this);
    }

    componentDidMount(){
        let users = this.props.users;
        let usersList = [];
        let ref = this;

        usersList = this.dictToListUsers(users);

        this.setState({
              users : usersList,
              socketId : this.props.socketId,
              username : this.props.username
          })

          // setInterval(this.fetchUsers, 1);
    }

    dictToListUsers(usersDict){
        let usersList = [];
        const ref=this;
        for(var prop in usersDict) {
          if(usersDict.hasOwnProperty(prop)){
            // console.log(prop, usersDict[prop]);
            if(ref.props.socketId===prop){
                ref.setState({username:usersDict[prop]})
                
            }
            usersList.push(usersDict[prop]);
          }
      }
      return usersList;
    }

    fetchUsers(){
        const ref=this;
        socket.on("userData", function(data) {
          console.log("New user created somewhere!!!")


          ref.setState({
              users : data.users,
              socketId : data.socketId,
          });
          const currentUser = data.users[ref.state.socketId];
          ref.setState({username:currentUser});
          console.log("Current User :"+currentUser);
      });


      const usersList = this.dictToListUsers(this.state.users);

        this.setState({
            users : usersList,
            socketId : this.props.socketId,
            username : this.props.username
        })
    }
  
  render() {
    let userItems = this.state.users.map((user)=>{
        return (
            <li className="list-inline-item" key={user}>
                <Avatar name={user} 
                        unstyled={false} 
                        size={75} 
                        round={75} 
                        style={{border:'1px solid red'}} 
                        className="sb-avatar"/>
                        
            </li>
            )
    })

    return (
        <ConfigProvider colors={['red', 'green', 'blue']}>
        
        
      <div className="Users">
        <p> All USers</p>
        {userItems}
    
        </div>
      </ConfigProvider>
    )
  }
}
