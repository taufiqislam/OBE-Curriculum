import React, {Fragment, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";

function BscYear({yearValue,yearChange}) {


    return (
        <Fragment>
            <Container className="p-3">
                <Row>
                   <Col>
                       <div>
                           <label htmlFor="" className='input-label'>Year</label>
                           <Form.Select onChange={yearChange} value={yearValue}>
                               <option value="">choose year</option>
                               <option value="1st Year">1st year</option>
                               <option value="2nd Year">2nd year</option>
                               <option value="3rd Year">3rd year</option>
                               <option value="4th Year">4th year</option>
                           </Form.Select>
                       </div>
                   </Col>
                </Row>
            </Container>
        </Fragment>
    );
}

export default BscYear;