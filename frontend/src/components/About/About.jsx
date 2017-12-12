import React, { Component } from 'react'
import { Button, Card,Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './styles.scss'

class About extends Component {
    render() {
      const description = [
        'The goal of this app is to help students spend less money to go somewhere far away, or find passengers for your car.'
  ].join(' ')
        return(

            <div className="About">
              <div className="nav">
                  <h1>About this App</h1>
                    <div className='buttons'>


                      <Link to="/">
                        <Button>
                              Home
                        </Button>
                      </Link>



                      <Link to="/About">
                      <Button >
                              About
                      </Button>
                      </Link>


                        <Link to="/login">
                        <Button >
                                Login
                          </Button>
                        </Link>


                        <Link to="/register">
                        <Button>
                                Register
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

export default About
