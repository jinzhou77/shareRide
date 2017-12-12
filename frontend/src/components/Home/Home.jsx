import React, { Component } from 'react'
import { Image,Button, Card, Container} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './styles.scss'

class Home extends Component {
    render() {
        return(

            <div className="Home">
              <div className='nav'>

              <h1>  Welcome to LongShareRide!</h1>
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
              <Image src='https://i2.wp.com/haptik.ai/blog/wp-content/uploads/2017/04/Sharecab_EarthDay.png' fluid/>


              </div>


        )
    }
}

export default Home
