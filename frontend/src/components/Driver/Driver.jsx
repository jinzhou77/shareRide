import React, { Component } from 'react'
import { Button, Input, Icon,Dropdown, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import styles from "./Driver.scss"

class Driver extends Component {
  constructor(){
    super();
    this.state={
      isLoggedIn:false,
      post_Click:false,
      driverName:'',
      driverEmail:'',
      driverGender:'',
      departureValue:'',
      destinationValue:'',
      hasSeats:'',
      time:'',
      phoneNumber:''
    };
    this.departureChange=this.departureChange.bind(this);
    this.destinationChange= this.destinationChange.bind(this);
    this.handlerClick= this.handlerClick.bind(this);
    this.hasSeatsChange=this.hasSeatsChange.bind(this);
    this.onSubmit= this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hasTimeChange=this.hasTimeChange.bind(this);
  }
  onSubmit(e){
    e.preventDefault();

    //create a string for an HTTP body message
    const driverName=this.state.driverName;
    const driverEmail=this.state.driverEmail;
    const driverGender= this.state.driverGender;
    const departure = this.state.departureValue;
    const destination = this.state.destinationValue;
    const hasSeats = this.state.hasSeats;
    const date = moment(this.state.startDate).format('DD/MM/YYYY');
    const time=this.state.time;
    const phoneNumber= this.state.phoneNumber;
    if(destination=='' || departure==""|| hasSeats==''|| date==''||time==''){
        alert("There is something missing");
    }else{
        const formData= `departure=${departure}&destination=${destination}&driverName=${driverName}&driverGender=${driverGender}&hasSeats=${hasSeats}&driverEmail=${driverEmail}&date=${date}&time=${time}&phoneNumber=${phoneNumber}`;

        // create an AJAX POST request (This should probably done with Axios instead)
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/api/rideInfo');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType='json';
        xhr.addEventListener('load', ()=> {
          if(xhr.status===201){
            alert('successfully posted');
            this.setState({
              message:"Posted!"
            })
          }else{
            this.setState({
              message:'Unable to Post'
            })
          }
        });
        xhr.send(formData);
      }
  }
  handlerClick(){
    this.setState(prevState => ({
      post_Click:!prevState.post_Click
    }));
  }
  componentDidMount() {
      axios.get('/api/profile').then( (res) => {
          console.log(res.data.user.gender);
          this.setState({
              isLoggedIn: true,
              driverName:res.data.user.name,
              driverEmail:res.data.user.email,
              driverGender:res.data.user.gender,
              phoneNumber:res.data.user.phoneNumber
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
  hasSeatsChange(e){
    this.setState({
      hasSeats:e.target.value
    })
  }
  handleChange(date) {
      this.setState({
          startDate: date
      });
  }
  hasTimeChange(e){
    this.setState({
      time:e.target.value
    })
  }
  render() {
    if(this.state.isLoggedIn){
      return(
        <div>
          <Link to="/dashboard"><Button>Back</Button></Link>
          <Link to="/"><Button>Logout</Button></Link>
          <h1>Hi {this.state.driverName}, this is Driver page</h1>
          <form onSubmit={this.onSubmit}>
            <div className="Driver_filter">
              <div className="search">
                  <div className = "bg">
                    <h1>Welcome {this.state.driverName}</h1>
                    <h3>Post the ride details you'd like to offer.</h3>
                      <p>Departure:</p>
                      <div class="field">
                <select value={this.state.departureValue} onChange={this.departureChange}>
                  <option value=''>Select You departure</option>
                  <option value="Chicago">Chicago</option>
                  <option value="O'hare">O'hare</option>
                  <option value="UIUC">UIUC</option>
                </select>
                  <p>Destination:</p>
                <select   value={this.state.destinationValue} onChange={this.destinationChange}>
                  <option value=''>Select Your Destination</option>
                  <option value="Chicago">Chicago</option>
                  <option value="O'hare">O'hare</option>
                  <option value="UIUC">UIUC</option>
                </select>
                  <p>Seats Available:</p>
                <select value={this.state.hasSeats} onChange={this.hasSeatsChange}>
                  <option value=''>Select the Seats Available</option>
                  <option value='1'>1+</option>
                  <option value='4'>4+</option>
                  <option value='100'>100+</option>
                </select>
                <p>Select your Date:</p>
                  <div className="calendar">
                <DatePicker classname="calendar"
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                />
                  </div>
                  <p>Seats Available:</p>
                <select value={this.state.time} onChange={this.hasTimeChange}>
                  <option value=''>Select the time period</option>
                  <option value="morning">Morning</option>
                  <option value="noon">Noon</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                </select>
                  <div className = "button">
                      <Button type='submit' >Post</Button>
                </div>
              </div>
            </div>
            </div>
            </div>
          </form>
        </div>
      )
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



export default Driver
