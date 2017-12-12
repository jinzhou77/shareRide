import React, { Component } from 'react'
import { Button, Card,Table,Image,Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import styles from './styles.scss'

class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
            userData:{},
            driverData:[],
            number:'',
            historyClicked:false,
            accept:false,
            decline:false,
            thePassenger:[],
            index:4
        }

        this.logOut = this.logOut.bind(this);
        this.onSubmit= this.onSubmit.bind(this);
        this.acceptChange= this.acceptChange.bind(this);
        this.declineChange= this.declineChange.bind(this);
    }
    onSubmit(e){
      e.preventDefault();
      console.log(this.state.userData);
      const driverName=this.state.userData.name;
      const formData=`{"driverName":"${driverName}"}`;
      const xhr= new XMLHttpRequest();
      xhr.responseType ='json';
      xhr.open("GET","http://localhost:3000/api/rideInfo?where="+formData);
      xhr.onload = () =>{
        if(xhr.readyState === xhr.DONE) {
          console.log(xhr.response.data);
          if(xhr.status ==200){
            this.setState({
              historyClicked:true,
              driverData:xhr.response.data
            })
          }else{
            console.log("did not get driver data");
          }
        }
      }
      xhr.send();
    }
    acceptChange(e,data){
      e.preventDefault();
      this.setState({
        accept:true,
        number:data.value
      })
    }
    componentDidMount() {
        axios.get('/api/users').then( (res) => {
          console.log(res.data.user);
            this.setState({
                isLoggedIn: true,
                userData:res.data.user,
            })
        }).catch( (err) => {
            this.setState({
                isLoggedIn: false,
            })
        });
    }


    logOut() {
        axios.get('/api/logout').then( (res) => {
            console.log("Logged out");
        })
    }
    declineChange(e,data){
        e.preventDefault();
        this.setState({
          decline:true,
          thePassenger:data.x,
          index:e.target.value
        })
    }
    render() {
      console.log('lalalalla');
      console.log(this.state.thePassenger);
      if(this.state.decline){
        const index= this.state.index;
        this.state.thePassenger.passengerEmail.splice(index,1);
        this.state.thePassenger.passengerGender.splice(index,1);
        this.state.thePassenger.passengerPhoneNumber.splice(index,1);
        const seats= +(this.state.thePassenger.hasSeats);
        const seatsReq = +(this.state.thePassenger.passengerSeats[index]);
        var sum=seats+seatsReq;
        this.state.thePassenger.hasSeats=sum.toString();
        this.state.thePassenger.passengerSeats.splice(index,1);
        var json=JSON.stringify(this.state.thePassenger);
        var xhr=new XMLHttpRequest();
        let url="http://localhost:3000/api/rideInfo/"+this.state.thePassenger._id;
        xhr.open ("PUT", url,true);
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.onload = () => {
          var rideUpdated = JSON.parse(xhr.responseText);
          if(xhr.readyState == 4 && xhr.status===200){
            console.log(rideUpdated);
            alert("You have decline the passenger's request, Thanks for your response");
          }else{
            console.log("did not update anything");
          }
        }
        xhr.send(json);
      }
      if(this.state.accept){
        alert('You have accept the passenger request, please call '+this.state.number);
      }
        if (this.state.isLoggedIn) {
          if(!this.state.historyClicked){
          return(
                <div className="Dashboard">
                  <div id="navbar">
                    <div className='buttons'>
                      <Link to="/Dashboard"><Button>Home</Button></Link>


                      <form onSubmit={this.onSubmit}>
                        <Button type="submit">History Request</Button>
                      </form>
                      <Link to="/About"><Button >About  </Button></Link>

                      <Link to="/"><Button className = "logoutButton">Logout</Button></Link>

                      </div>
                  </div>
                  <h3>You are...</h3>
                  <div className="select">

                    <div className="column" id = "Driver">
                      <Image src="https://i.imgur.com/n1EtVNB.png" fluid/>
                          <div className = "content1">

                              <Link to="/Driver"><Button>FOR DRIVERS</Button></Link>
                              <p>Post your upcoming rides,<br/>
                                  earn extra money<br/>and even make a friend along the way.</p>
                                </div>
                            </div>
                            <div className="column" id = "Passenger">
                              <Image src="https://i.imgur.com/wUPTpzU.png" fluid/>
                                <div className = "content">
                                     <Link to="/Passenger"><Button>FOR PASSENGERS</Button></Link>
                                     <p>Find your route,<br/>then sit back and relax:<br/> we'll take care of the rest!</p>
                                </div>
                            </div>

                    </div>
                  </div>

            )
        }else{
          return(

            <div className="request">
              <div id="navbar2">
                <h1>Driver request</h1>
                <div className='buttons'>
                  <Link to="/Dashboard"><Button>Home</Button></Link>
                    <Link to="/About"><Button >About  </Button></Link>
                    <Link to="/"><Button className = "logoutButton">Logout</Button></Link>
                  </div>
                </div>
              <div>
              {this.state.driverData.map((i,index)=>
                <div key={index}>
                  <h2>Trip From {i.departure} to {i.destination}</h2>

                  <div>
                    <Table singleLine>
                      <Table.Header>
                        <Table.Row>
                        <Table.HeaderCell></Table.HeaderCell>
                         <Table.HeaderCell>Passenger Email</Table.HeaderCell>
                         <Table.HeaderCell>Passenger Gender</Table.HeaderCell>
                         <Table.HeaderCell>Seats Asked</Table.HeaderCell>
                         <Table.HeaderCell></Table.HeaderCell>
                         <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {i.passengerEmail.map((j,index)=>
                          <Table.Row key={index}>

                            <Table.Cell><Icon name='users' /></Table.Cell>
                            <Table.Cell>{j}@illinois.edu</Table.Cell>
                            <Table.Cell>{i.passengerGender[index]}</Table.Cell>
                            <Table.Cell>{i.passengerSeats[index]}</Table.Cell>

                            <Table.Cell><form onClick={this.acceptChange}><Button value={i.passengerPhoneNumber[index]} disabled={this.state.accept||this.state.decline}>Accept</Button></form></Table.Cell>
                            <Table.Cell><Button value={index} x={i} onClick={this.declineChange} disabled={this.state.accept||this.state.decline}>Decline</Button></Table.Cell>
                          </Table.Row>
                        )}
                      </Table.Body>
                    </Table>
                  </div>
                </div>
                )}
              </div>

            </div>
          )
        }
      }else {
            return(
                <div className="Dashboard">
                    <Card>
                        <h1>You must log in before you can see this page.</h1>
                        <Link to="/">
                            Back
                        </Link>
                    </Card>
                </div>
            )
        }
      }
}

export default Dashboard
