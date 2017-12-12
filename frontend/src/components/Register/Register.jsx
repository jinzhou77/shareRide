import React, { Component } from 'react'
import { Button, Input, Card } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import styles from './styles.scss'


class Register extends Component {
    constructor() {
        super();

        this.state = {
            user: {
                password: '',
                email: '',
                phoneNumber:'',
                name:'',
                gender:'',
            },

            message: ''
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
        this.onChangeName=this.onChangeName.bind(this);
        this.onChangeGender= this.onChangeGender.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        // create a string for an HTTP body message
        const name = encodeURIComponent(this.state.user.name);
        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const phoneNumber = encodeURIComponent(this.state.user.phoneNumber);
        const gender = encodeURIComponent(this.state.user.gender);

        const formData = `name=${name}&email=${email}&password=${password}&phoneNumber=${phoneNumber}&gender=${gender}`;

        // create an AJAX POST request (This should probably done with Axios instead)
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/api/register');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                console.log('The form is valid');
                console.log(this.state.user.gender);
                this.setState({
                    message: 'Registered!'
                })
            } else {
                this.setState({
                    message: 'Unable to register'
                })
            }
        });
        xhr.send(formData);
    }

    onChangeEmail(e) {
        const user = this.state.user;
        user.email = e.target.value;

        this.setState({
            user
        })
    }

    onChangePassword(e) {
        const user = this.state.user;
        user.password = e.target.value;
        this.setState({
            user
        })
    }

    onChangePhoneNumber(e) {
        const user = this.state.user;
        user.phoneNumber = e.target.value;
        this.setState({
            user
        })
    }
    onChangeName(e){
      const user=this.state.user;
      user.name=e.target.value;
      this.setState({
        user
      })
    }
    onChangeGender(e){
      const user=this.state.user;
      user.gender=e.target.value;
      this.setState ({
        user
      })
    }
    render() {
        return(
            <form className="Register" action="/" onSubmit={this.onSubmit}>
                <Card className="Register__content">
                    <div>
                        <h1>Register</h1>

                        <Input size='small' label="Name" onChange={this.onChangeName} />
                        <br/><br/>
                        <Input size='small' label="Password" onChange={this.onChangePassword} />
                        <br/><br/>
                        <Input size='small' label="@illinois.edu" labelPosition='right' placeholder='Email adress' onChange={this.onChangeEmail} />
                        <br/><br/>
                        <Input size='small' label="phone#" onChange={this.onChangePhoneNumber} />
                        <br/><br/>

                        <select className='gender' value={this.state.user.gender} onChange={this.onChangeGender}>
                          <option value=''>Select Your Gender</option>
                          <option value='male'>Male</option>
                          <option value='female'>Female</option>
                        </select>
                        <br/><br/>
                        <p>{this.state.message}</p>
                        <Input type="submit" />
                        <h4>Already registered? Click <Link to="/login">here</Link> to Log-in!</h4>
                        <Link to="/dashboard"><p>Go to Dashboard</p></Link>
                    </div>
                </Card>
            </form>
    )
  }
}

export default Register
