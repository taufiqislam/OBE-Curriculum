import React,{useContext} from 'react';

import {Button, Col, Container, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

function Home(props) {

    return (
        <Container fluid="true">
            <Container fluid="true" className="backImg text-center">
                <div className="overlay">
                    <div className="content " >
                        <h4 className='title pb-3'>WELCOME TO OUR OBE-COURSE CURRICULUM SYSTEM</h4>
                        <div className='pb-3'>                        
                        <Link to='/mission/0'  className='p-3'>
                            <Button className='tabMission btn-secondary'>Admin</Button>
                        </Link>
                        </div>
                        <div>
                        <Link to='/mission/1'  className='p-3'>
                            <Button className='tabMission btn-secondary'>Teacher</Button>
                        </Link>
                        </div>

                    </div>
                </div>
            </Container>
        </Container>
    );
}

export default Home;