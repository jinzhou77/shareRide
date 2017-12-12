import React, { Component } from 'react'
import { Image,Button, Card, Container,Menu,Dropdown} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './styles.scss'

class Home extends Component {
    render() {
        return(

            <div className="Home">
              <div className='nav'>
                <Menu borderless className='buttons'>
                <Menu.Item ><Link to="/"><Button id='home'>Home</Button></Link></Menu.Item>

                <Menu.Item ><Link to="/About"><Button id='about'>About  </Button></Link></Menu.Item>
                <Menu.Item ><Link to="/login"><Button id='request'>Log in</Button></Link></Menu.Item>
                <Menu.Item ><Link to="/register"><Button id='out'>register</Button></Link></Menu.Item>
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

              <div className='box'>
              <Image src='https://i2.wp.com/haptik.ai/blog/wp-content/uploads/2017/04/Sharecab_EarthDay.png' fluid/>
              <div id='wel'>Welcom to ShareRide APP, let the journey start!!</div>
              </div>


              </div>


        )
    }
}

export default Home
