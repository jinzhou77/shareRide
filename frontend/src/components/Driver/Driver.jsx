import React, { Component } from 'react'
import { Button, Input, Icon,Dropdown, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styles from "./Driver.css"

class Driver extends Component {
  constructor(){
    super();
    this.state={
      isLoggedIn:false,
      post_Click:false,
      driverName:'',
      driverEmail:'',
      departureValue:'',
      destinationValue:'',
      hasSeats:''
    };
    this.departureChange=this.departureChange.bind(this);
    this.destinationChange= this.destinationChange.bind(this);
    this.handlerClick= this.handlerClick.bind(this);
    this.hasSeatsChange=this.hasSeatsChange.bind(this);
    this.onSubmit= this.onSubmit.bind(this);
  }
  onSubmit(e){
    e.preventDefault();

    //create a string for an HTTP body message
    const driverName=this.state.driverName;
    const driverEmail=this.state.driverEmail;
    const departure = this.state.departureValue;
    const destination = this.state.destinationValue;
    const hasSeats = this.state.hasSeats;
    const formData= `departure=${departure}&destination=${destination}&driverName=${driverName}&hasSeats=${hasSeats}&driverEmail=${driverEmail}`;

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
  handlerClick(){
    this.setState(prevState => ({
      post_Click:!prevState.post_Click
    }));
  }
  componentDidMount() {
      axios.get('/api/profile').then( (res) => {
          console.log(res.data.user);
          this.setState({
              isLoggedIn: true,
              driverName:res.data.user.name,
              driverEmail:res.data.user.email
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

  render() {
    if(this.state.isLoggedIn){
      return(
        <div>
          <h1>Hi {this.state.driverName}, this is Driver page</h1>
          <Link to="/dashboard"><Button>Back</Button></Link>
          <Link to="/"><Button>Logout</Button></Link>
          <form onSubmit={this.onSubmit}>
            <div className="Driver_filter">
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
                <select value={this.state.hasSeats} onChange={this.hasSeatsChange}>
                  <option value=''>Select the hasSeats Available</option>
                  <option value='1'>1</option>
                  <option value='4'>4</option>
                  <option value='6'>6</option>
                </select>
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
