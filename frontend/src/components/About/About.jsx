import React, { Component } from 'react'
import { Button, Card,Image,Menu, Dropdown} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styles from './styles.scss'

class About extends Component {
  constructor() {
      super();
      this.state = {
          isLoggedIn: false,
      }

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

    render() {
      const description = [
        'The goal of this app is to help students spend less money to go somewhere far away, or find passengers for your car.'
  ].join(' ')
    if(this.state.isLoggedIn){
        return(

            <div className="About">
              <div className="nav">
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
                      <Image className="image" src="https://i.imgur.com/wUPTpzU.png" fluid />
                      <div id='intro'>
                        <h1>About this App</h1>
                        <p>
                          ShareRide is a student-to-student ridesharing app focusing on long-distance travel. The goal of this app is to help students spend less money to go somewhere far away, or find passengers for your car.
                        </p>
                        <p>
                          Drivers and passengers are required to be both students from UIUC. For the purpose of safety and convenience, the application would require users to have the illinois.edu email address to get registered.
                        </p>
                      </div>
              </div>


        )

  }else{
    return(

        <div className="About">
          <div className="nav">
              <h1>About this App</h1>
                <div className='buttons'>


                  <Link to="/Dashboard">
                    <Button>
                          Home
                    </Button>
                  </Link>



                  <Link to="/About">
                  <Button >
                          About
                  </Button>
                  </Link>


                    <Link to="/">
                    <Button >
                            Logout
                      </Button>
                    </Link>


                    <Link to="/Request">
                    <Button>
                            Request
                    </Button>
                    </Link>

                  </div>
                </div>
                  <Image className="image" src="https://i.imgur.com/wUPTpzU.png" fluid />
                  <div id='intro'>
                    <p>
                      ShareRide is a student-to-student ridesharing app focusing on long-distance travel. The goal of this app is to help students spend less money to go somewhere far away, or find passengers for your car.
                    </p>
                    <p>
                      Drivers and passengers are required to be both students from UIUC. For the purpose of safety and convenience, the application would require users to have the illinois.edu email address to get registered.
                    </p>
                  </div>
          </div>
        )
      }
  }
}

export default About
