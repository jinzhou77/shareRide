import React, { Component } from 'react'
import { Button, Card,Table,Image,Icon, Confirm, Divider,Menu, Dropdown} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import styles from './styles.scss'

class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            isLoggedIn: false,
        }

        this.logOut = this.logOut.bind(this);
    }

    componentDidMount() {
        axios.get('/api/users').then( (res) => {
          console.log(res.data.user);
            this.setState({
                isLoggedIn: true,
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
    render() {
      if (this.state.isLoggedIn) {
          return(
                <div className="Dashboard">
                  <div id="navbar">

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

                  <h3 >You are...</h3>
                  <div className="select">

                    <div id = "Driver">
                      <Image id="wheel" src="https://i.imgur.com/n1EtVNB.png" fluid/>

                          <div className = "content1">

                              <Link to="/Driver"><Button size="tiny">DRIVERS</Button></Link>
                              <p>Post your upcoming rides,<br/>
                                  earn extra money<br/>and even make a friend along the way.</p>
                                </div>
                            </div>
                            <Divider id='divider' hidden />
                            <div id = "Passenger">
                              <Image id='happy' src="https://i.imgur.com/wUPTpzU.png" fluid/>
                                <div className = "content2">
                                     <Link to="/Passenger"><Button size="tiny">PASSENGERS</Button></Link>
                                     <p>Find your route,<br/>then sit back and relax:<br/> we'll take care of the rest!</p>
                                </div>
                            </div>
                    </div>
                  </div>


            )
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
