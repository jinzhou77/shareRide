import React, { Component } from 'react'
import { Button, Input, Icon,Dropdown,Card,Table, Form,Divider,Segment,Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from  'axios'
import PropTypes from 'prop-types';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

import styles from './Passenger.scss';

// var data;
var url;
class Passenger extends Component {
  constructor(props){
    super(props);
    this.state={
      isLoggedIn:false,
      passengerName:'',
      passengerEmail:'',
      passengerGender:'',
      passengerPhoneNumber:'',
      departureValue:'',
      destinationValue:'',
      numberSeats:'',
      results:{},
      data:[],
      time:'',
      isClicked:false,
      passengerClicked:false,
      theDriver: [],
    };
    this.departureChange=this.departureChange.bind(this);
    this.destinationChange=this.destinationChange.bind(this);
    this.seatsChange= this.seatsChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
    this.passengerSubmit= this.passengerSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hasTimeChange= this.hasTimeChange.bind(this);
  }

  passengerSubmit(e, data){
    this.setState({
      theDriver:data.value,
      passengerClicked:true
    })
  }

  handleChange(date) {
      this.setState({
          startDate: date
      });
  }

  onSubmit(e){
    e.preventDefault();
    const passengerName=this.state.passengerName;
    const passengerEmail=this.state.passengerEmail;
    const destination= this.state.destinationValue;
    const departure = this.state.departureValue;
    const hasSeats= this.state.numberSeats;
    const date = moment(this.state.startDate).format('DD/MM/YYYY');
    const time = this.state.time;
    if(destination=='' || departure==""|| hasSeats==''|| date==''||time==''){
      alert("There is something missing");
    }else{
        const formData = `{"departure":"${departure}","destination":"${destination}","hasSeats":"${hasSeats}","date":"${date}","time":"${time}"}`;
        const xhr= new XMLHttpRequest();

        xhr.open("GET", "http://localhost:3000/api/rideInfo/?where="+formData);
        // xhr.onreadystatechange = () =>{
        console.log("http://localhost:3000/api/rideInfo/?where="+formData);
        xhr.responseType = 'json';
        // xhr.onreadystatechange = () =>{
        xhr.onload = () => {
          if (xhr.readyState === xhr.DONE) {
            if(xhr.status==200){
              console.log('xhrresponse');
              console.log(xhr.response.data);
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


  }
  componentDidMount() {
      axios.get('/api/profile').then( (res) => {
          console.log(res.data.user);
          this.setState({
              isLoggedIn: true,
              passengerName:res.data.user.name,
              passengerEmail:res.data.user.email,
              passengerPhoneNumber:res.data.user.phoneNumber,
              passengerGender:res.data.user.gender
          })
      }).catch( (err) => {
          this.setState({
              isLoggedIn: false
          })
      })
  }
  departureChange(e,{value}){
    this.setState({
      departureValue:value
    })
  }
  destinationChange(e,{value}){
    this.setState({
      destinationValue:value
    })
  }
  seatsChange(e,{value}){
    this.setState({
      numberSeats:value
    })
  }
  hasTimeChange(e,{value}){
    this.setState({
      time:value
    })
  }
  render() {
    const options= [
      {key:'Chicago', text:'Chicago',value:"Chicago"},
      {key:'UIUC', text:'UIUC',value:"UIUC"},
      {key:"O'hare", text:"O'hare",value:"O'hare"},
      {key:'Michigan', text:'Michigan',value:"Michigan"},
    ]
    const options2=[
      {keys:'morning',text:'Morning', value:'morning'},
      {keys:'noon',text:'Noon', value:'noon'},
      {keys:'afternoon',text:'Afternoon', value:'afternoon'},
      {keys:'evening',text:'Evening', value:'evening'},
    ]
    const options3=[
      {keys:'1', text:"1+", value:'1'},
      {keys:'3', text:"3+", value:'3'},
      {keys:'5', text:"5+", value:'5'}
    ]
    console.log(this.state.departureValue);
    console.log(this.state.destinationValue);
    console.log(this.state.time);

    console.log(this.state.numberSeats);
    console.log(this.state.startDate);
    //console.log(moment(this.state.startDate).format('DD-MM-YYYY'));
    if(this.state.passengerClicked){
      url="http://localhost:3000/api/rideInfo/"+this.state.theDriver._id;
      console.log(url);
      console.log('fffffjfjfjfjfjjfjfjfjfj')
      console.log(this.state.theDriver);
      this.state.theDriver.passengerEmail.push(this.state.passengerEmail);
      this.state.theDriver.passengerGender.push(this.state.passengerGender);
      this.state.theDriver.passengerSeats.push(this.state.numberSeats);
      this.state.theDriver.passengerPhoneNumber.push(this.state.passengerPhoneNumber);
      console.log("updated seats")
      console.log(this.state.theDriver.passengerSeats);
      this.state.theDriver.hasSeats=this.state.theDriver.hasSeats-this.state.numberSeats;
      var json =JSON.stringify(this.state.theDriver);
      var xhr=new XMLHttpRequest();
      xhr.open("PUT", url,true);
      xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
      xhr.onload = () => {
        var rideUpdated = JSON.parse(xhr.responseText);
        if(xhr.readyState == 4 && xhr.status===200){
          console.log(rideUpdated);
          alert("You have successfully submit");
        }else{
          console.log("did not update anything");
        }
      }
      xhr.send(json);
      //////////////////////////////////////////////////////////////
      var url2 = "http://localhost:3000/api/rideInfo/messagealert";
      var xhr2 = new XMLHttpRequest();
      //console.log("haha" + this.state.data);
      var driverPhoneNumber = this.state.theDriver.phoneNumber;
      console.log("phone: " + driverPhoneNumber);
      var json2 = `driverPhoneNumber=${driverPhoneNumber}`;
      xhr2.open("POST", url2, true);
      xhr2.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr2.responseType='json';
      xhr2.addEventListener('load', () => {
          console.log("didn't send");
      });
      xhr2.send(json2);
      ///////////////////////////////////////////////////////////////
    }
    if(this.state.isLoggedIn){
      if(!this.state.isClicked){
        return(
          <div className="Passenger">

            <div className="nav">
              <h1>Hi, {this.state.passengerName}, This is Passenger page</h1>
              <div className="buttons">
                <Link to="/dashboard"><Button>Back</Button></Link>
                <Link to="/"><Button>Logout</Button></Link>
              </div>
            </div>

<iframe id="gif1" src="https://giphy.com/embed/jvbQuNWohvydW"  frameBorder="0" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/patrick-ride-enjoying-jvbQuNWohvydW"></a></p>
                <div  className="Passenger_filter">
                <Container className='container1'>
                <h1 id='welcome'>Welcome {this.state.passengerName}</h1>
                <h3 id='pick'>pick the ride details you'd like to take.</h3>
                <Form>
                <Form.Group widths='equal'>
                  <Form.Select label="Departure" value={this.state.departureValue} onChange={this.departureChange} options={options} placeholder='Departure' />
                  <Form.Select label="Destination" value={this.state.destinationValue} onChange={this.destinationChange} options={options} placeholder='Destination' />
                </Form.Group>
                {/* (e,{value})=>alert(value) */}
                <Form.Group widths='equal'>
                  <Form.Select label="Time Period" value={this.state.time} onChange={this.hasTimeChange} options={options2} placeholder='Time Period' />
                  <Form.Select label="Seats Need" value={this.state.numberSeats} onChange={this.seatsChange} options={options3} placeholder='Seats Available' />
                </Form.Group>
                </Form>

                  <p id="date">Select your Date:</p>
                  <div className="calendar">
                  <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleChange}
                  />
                  <Button type="submit" onClick={this.onSubmit}>Search</Button>
                  </div>
                  </Container>
                  </div>
                </div>
                )
        }else{
          if(!this.state.passengerClicked){
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
                       <Table.HeaderCell>Date</Table.HeaderCell>
                       <Table.HeaderCell>Time Period</Table.HeaderCell>
                       <Table.HeaderCell>Gender</Table.HeaderCell>
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
                            <Table.Cell>{i.date}</Table.Cell>
                            <Table.Cell>{i.time}</Table.Cell>
                            <Table.Cell>{i.driverGender}</Table.Cell>
                            <Table.Cell><Button value={i} onClick={this.passengerSubmit}>Submit</Button></Table.Cell>
                          </Table.Row>
                        )}
                    </Table.Body>
                  </Table>
              </div>
            )
          }else{
            return(
              <div className="results">
                <div className="navbar3">
                  <h1>You've submitted a reques to the Drive, below is the driver's contact information</h1>
                  <div className='buttons'>
                    <Link to="/Dashboard"><Button>Back</Button></Link>
                    <Link to="/"><Button>Logout</Button></Link>
                  </div>
                </div>
                <div className="card">
                  <Segment className="info">Drivers Name: {this.state.theDriver.driverName}</Segment>

                  <Segment className="info">Drivers Email: {this.state.theDriver.driverEmail}@illinois.edu</Segment>
                </div>
              </div>
            )
          }
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
