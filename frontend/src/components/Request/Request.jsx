import React, { Component } from 'react'
import { Button, Card,Table,Image,Icon, Confirm, Modal, Menu, Dropdown} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import styles from './Request.scss'

class Request extends Component {
  constructor() {
      super();
      this.state = {
        isLoggedIn: false,
        result:'',
        open:false,
        userData:{},
        driverData:[],
        thePassenger:[],
        number:'',
        historyClicked:false,
        index:4,
        result:'',
        open:false,
        accept:'',
        decline:''
      }
      this.logOut = this.logOut.bind(this);
      this.onSubmit= this.onSubmit.bind(this);
      this.accept=this.accept.bind(this);
      this.decline=this.decline.bind(this);
      this.handleCancel=this.handleCancel.bind(this);
      this.handleConfirm=this.handleConfirm.bind(this);

    }
    onSubmit(e){
      e.preventDefault();
      console.log(this.state.userData);
      const driverName=this.state.userData.name;
      const formData=`{"driverName":"${driverName}"}`;
      const xhr= new XMLHttpRequest();
      xhr.responseType ='json';
      xhr.open("GET","/api/rideinfo/?where="+formData);
      console.log("http://localhost:3000/api/rideInfo/?where="+formData);
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

    accept(){
      this.setState({
        open:true,
        accept:'accept'
      })
    }
    decline(){
      this.setState({
        open:true,
        decline:'decline'
      })
    }
    handleConfirm(e,data){
      this.setState({
        result: 'confirmed',
        index:e.target.value,
         thePassenger:data.x,
        open: false,

      })
    }
    handleCancel(){
      this.setState({
        result: 'cancelled',
        open: false
      })
    }
    render(){
      console.log(this.state.result)
      console.log('lalalalla');
      console.log(this.state.thePassenger);
      if(this.state.accept === 'accept'){
        if(this.state.result === 'confirmed'){
          const index= this.state.index;
          const email=this.state.thePassenger.passengerEmail[index]+'@illinois.edu';
          const phoneNumber= this.state.thePassenger.passengerPhoneNumber[index];
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
          let url="https://git.heroku.com/dry-temple-92256.git/"+this.state.thePassenger._id;
          xhr.open ("PUT", url,true);
          xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
          xhr.onload = () => {
            var rideUpdated = JSON.parse(xhr.responseText);
            if(xhr.readyState == 4 && xhr.status===200){
              console.log(rideUpdated);
              alert("You have accept the passenger's request, The passenger's email is "+email +' and phoen number: '+phoneNumber);
            }else{
              console.log("did not update anything");
            }
          }
          xhr.send(json);
        }
      }
      if(this.state.decline ==='decline'){
        if(this.state.result === 'confirmed'){
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
          let url="https://git.heroku.com/dry-temple-92256.git/"+this.state.thePassenger._id;
          xhr.open ("PUT", url,true);
          xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
          xhr.onload = () => {
            var rideUpdated = JSON.parse(xhr.responseText);
            if(xhr.readyState == 4 && xhr.status===200){
              console.log(rideUpdated);
              alert("Thanks for your response, we've removed the passenger from the requests.");
            }else{
              console.log("did not update anything");
            }
          }
          xhr.send(json);
        }
      }

      return(
        <div>
        <div id="navbar2">
          <Menu borderless className='buttons'>
          <Menu.Item ><Link to="/Dashboard"><Button id='home'>Home</Button></Link></Menu.Item>
          <Menu.Item ><Link to="/Request"><Button id='request'>History Request</Button></Link></Menu.Item>
          <Menu.Item ><Link to="/About"><Button id='about'>About  </Button></Link></Menu.Item>
          <Menu.Item ><Link to="/"><Button id='out'>Logout</Button></Link></Menu.Item>
          <Menu.Menu  position='right'>
          <Dropdown id='menu' fluid item text='&#9776;'>
            <Dropdown.Menu>
            <Dropdown.Item><Link to="/Dashboard"><Button>Home</Button></Link></Dropdown.Item>
            <Dropdown.Item><Link to="/Request"><Button>History Request</Button></Link></Dropdown.Item>
            <Dropdown.Item><Link to="/About"><Button >About  </Button></Link></Dropdown.Item>
            <Dropdown.Item><Link to="/"><Button className = "logoutButton">Logout</Button></Link></Dropdown.Item>
          </Dropdown.Menu>
          </Dropdown>
          </Menu.Menu>
          </Menu>
        </div>
        <div className="request">
          <h1>Passenger's request</h1>
          <p>To see the requests from the passengers, click the button below</p>
          <Button onClick={this.onSubmit}>Requests</Button>
        </div>
          {this.state.driverData.map((i,index)=>
            <div key={index}>

                <div className="Trips" key={index}>
                <Table singleLine>
                  <Table.Header>
                    <Table.Row>
                     <Table.HeaderCell>From {i.departure} <b>to</b> {i.destination}</Table.HeaderCell>
                     <Table.HeaderCell>Passenger Email</Table.HeaderCell>
                     <Table.HeaderCell>Passenger Gender</Table.HeaderCell>
                     <Table.HeaderCell>Seats Asked</Table.HeaderCell>
                     <Table.HeaderCell />
                     <Table.HeaderCell />
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {i.passengerEmail.map((j,index)=>
                      <Table.Row key={index}>

                        <Table.Cell><Icon name='users' size='big' circular /></Table.Cell>
                        <Table.Cell>{j}@illinois.edu</Table.Cell>
                        <Table.Cell>{i.passengerGender[index]}</Table.Cell>
                        <Table.Cell>{i.passengerSeats[index]}</Table.Cell>

                        <Table.Cell>
                          <Modal id="modal" trigger={<Button onClick={this.accept}>Accept</Button>}>
                            <Modal.Actions className='actions'>
                              <p>Are you sure to accept this passenger's requests</p>
                              <Button className= "but" value="cancelled" color="red" onClick={this.handleCancel}> Cancel</Button>
                              <Button className= "but" value={index} x={i} color="green" onClick={this.handleConfirm}> Confirm</Button>
                            </Modal.Actions>
                          </Modal>
                        </Table.Cell>

                        <Table.Cell>
                          <Modal id="modal" trigger={<Button onClick={this.decline}>Decline</Button>}>
                            <Modal.Actions className='actions'>
                              <p>Are you sure to decline this passenger's requests</p>
                              <Button className= "but" value="cancelled"  color="red" onClick={this.handleCancel}> Cancel</Button>
                              <Button className= "but" value={index}  x={i} color="green" onClick={this.handleConfirm}> Confirm</Button>
                            </Modal.Actions>
                          </Modal>
                        </Table.Cell>
                      </Table.Row>
                        )}
                  </Table.Body>
                </Table>
              </div>
              </div>
            )}

      </div>
      )
    }
  }
  export default Request
