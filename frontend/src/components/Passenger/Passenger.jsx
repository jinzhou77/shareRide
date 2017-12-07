import React, { Component } from 'react'
import { Button, Input, Icon,Dropdown,Card,Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from  'axios'
import PropTypes from 'prop-types';
import styles from './Passenger.css'
// var data;
var url;
class Passenger extends Component {
  constructor(props){
    super(props);
    this.state={
      isLoggedIn:false,
      passengerName:'',
      passengerEmail:'',
      departureValue:'',
      destinationValue:'',
      numberSeats:'',
      results:{},
      data:[],
      isClicked:false,
      passengerClicked:false,
      theDriver: []
    };
    this.departureChange=this.departureChange.bind(this);
    this.destinationChange=this.destinationChange.bind(this);
    this.seatsChange= this.seatsChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
    this.passengerSubmit= this.passengerSubmit.bind(this);
  }
  passengerSubmit(e, data){
    this.setState({
      theDriver:data.value,
      passengerClicked:true
    })
  }
  onSubmit(e){
    e.preventDefault();
    const passengerName=this.state.passengerName;
    const passengerEmail=this.state.passengerEmail;
    const destination= this.state.destinationValue;
    const departure = this.state.departureValue;
    const hasSeats= this.state.numberSeats;

    const formData = `{"departure":"${departure}","destination":"${destination}","hasSeats":"${hasSeats}"}`;
    const xhr= new XMLHttpRequest();

    xhr.open("GET", "http://localhost:3000/api/rideInfo?where="+formData);
    // xhr.onreadystatechange = () =>{
    xhr.responseType = 'json';
    // xhr.onreadystatechange = () =>{
    xhr.onload = () => {
      if (xhr.readyState === xhr.DONE) {
        if(xhr.status==200){
        this.setState({
          results:xhr.response,
          data:xhr.response.data,
          isClicked:true
        })
      }else{
        console.log("did not get anything");
      }
    }
  }
    xhr.send();
  }
  componentDidMount() {
      axios.get('/api/profile').then( (res) => {
          console.log(res.data.user);
          this.setState({
              isLoggedIn: true,
              passengerName:res.data.user.name,
              passengerEmail:res.data.user.email
          })
      }).catch( (err) => {
          this.setState({
              isLoggedIn: false
          })
      })
  }
  departureChange(e){
    this.setState({
      departureValue:e.target.value
    })
  }
  destinationChange(e){
    this.setState({
      destinationValue:e.target.value
    })
  }
  seatsChange(e){
    this.setState({
      numberSeats:e.target.value
    })
  }

  render() {
    if(this.state.passengerClicked){
      url="http://localhost:3000/api/rideInfo/"+this.state.theDriver._id;
      console.log(url);
      this.state.theDriver.passengersEmail.push(this.state.passengerEmail);
      this.state.theDriver.hasSeats=this.state.theDriver.hasSeats-this.state.numberSeats;
      var json =JSON.stringify(this.state.theDriver);
      var xhr=new XMLHttpRequest();
      xhr.open("PUT", url,true);
      xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
      xhr.onload = () => {
        var rideUpdated = JSON.parse(xhr.responseText);
        if(xhr.readyState == 4 && xhr.status===200){
          console.log(rideUpdated);
        }else{
          console.log("did not update anything");
        }
      }
      xhr.send(json);
    }
    if(this.state.isLoggedIn){
      if(!this.state.isClicked){
        return(
          <div>
            <h1> this is Passenger page</h1>
            <Link to="/"><Button>Logout</Button></Link>
            <Link to="/MainPage"><Button>MainPage</Button></Link>
            <div className="Passenger_filter">
            <form onSubmit={this.onSubmit}>
              <div>
                  <select value={this.state.departureValue} onChange={this.departureChange}>
                    <option value=''>Select You departure</option>
                    <option value="Chicago">Chicago</option>
                    <option value="O'hare">O'hare</option>
                    <option value="UIUC">UIUC</option>
                  </select>
                  <select   value={this.state.destinationValue} onChange={this.destinationChange}>
                    <option value=''>Select Your Destination</option>
                    <option value="Chicago">Chicago</option>
                    <option value="O'hare">O'hare</option>
                    <option value="UIUC">UIUC</option>
                  </select>
                  <select value={this.state.numberSeats} onChange={this.seatsChange}>
                    <option value=''>Select the hasSeats Available</option>
                    <option value='1'>1</option>
                    <option value='4'>4</option>
                    <option value='6'>6</option>
                  </select>
               <Button type="submit">Search</Button>
              </div>
            </form>
              </div>
            </div>
          )
        }else{
          return(
            <div>
              <p>Result page</p>
                <Table singleLine>
                  <Table.Header>
                    <Table.Row>
                     <Table.HeaderCell>Driver Name</Table.HeaderCell>
                     <Table.HeaderCell>Departure</Table.HeaderCell>
                     <Table.HeaderCell>Destination</Table.HeaderCell>
                     <Table.HeaderCell>Available Seats</Table.HeaderCell>
                     <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                      {this.state.data.map((i)=>
                        <Table.Row key={i._id}>
                          <Table.Cell>{i.driverName}</Table.Cell>
                          <Table.Cell>{i.departure}</Table.Cell>
                          <Table.Cell>{i.destination}</Table.Cell>
                          <Table.Cell>{i.hasSeats}</Table.Cell>
                          <Table.Cell><Button value={i}onClick={this.passengerSubmit}>Submit</Button></Table.Cell>
                        </Table.Row>
                      )}
                  </Table.Body>
                </Table>
            </div>
          )
        }
      }else{
        return(
          <div>
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

export default Passenger
