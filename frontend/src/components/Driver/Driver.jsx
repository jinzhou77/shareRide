import React, { Component } from 'react'
import { Button, Input, Icon,Dropdown, Card,Form } from 'semantic-ui-react'
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
  hasSeatsChange(e,{value}){
    this.setState({
      hasSeats:value
    })
  }
  handleChange(date) {
      this.setState({
          startDate: date
      });
  }
  hasTimeChange(e,{value}){
    this.setState({
      time:value
    })
  }
  render() {
    console.log(this.state.departureValue);
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
    ]
    const options3=[
      {keys:'1', text:"1+", value:'1'},
      {keys:'3', text:"3+", value:'3'},
      {keys:'6', text:"6+", value:'6'}
    ]
    if(this.state.isLoggedIn){
      return(
        <div className="Driver">

          <div className="nav">
            <h1>Hi {this.state.driverName}, this is Driver page</h1>
            <div className="buttons">
              <Link to="/dashboard"><Button>Back</Button></Link>
              <Link to="/"><Button>Logout</Button></Link>
            </div>
          </div>

          <form onSubmit={this.onSubmit} className="Driver_filter">
                    <h1>Welcome {this.state.driverName}</h1>
                    <h3>Post the ride details you'd like to offer.</h3>


                    <Form>
                    <Form.Group widths='equal'>
                      <Form.Select label="Departure" value={this.state.departureValue} onChange={this.departureChange} options={options} placeholder='Departure' />
                      <Form.Select label="Destination" value={this.state.destinationValue} onChange={this.destinationChange} options={options} placeholder='Destination' />
                    </Form.Group>
                    {/* (e,{value})=>alert(value) */}
                    <Form.Group widths='equal'>
                      <Form.Select label="Time Period" value={this.state.time} onChange={this.hasTimeChange} options={options2} placeholder='Time Period' />
                      <Form.Select label="Seats Available" value={this.state.hasSeats} onChange={this.hasSeatsChange} options={options3} placeholder='Seats Available' />
                    </Form.Group>
                    </Form>


                <p>Select your Date:</p>
                  <div className="calendar">
                <DatePicker classname="calendar"
                    selected={this.state.startDate}
                    onChange={this.handleChange}
                />
                  </div>

                  <div className = "button">
                      <Button type='submit' >Post</Button>
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
