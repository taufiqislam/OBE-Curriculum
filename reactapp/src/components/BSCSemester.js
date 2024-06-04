import React, {Fragment, useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";

function BscSemester({semesterValue,semesterChange}) {



    return (
        <Fragment>
            <Container className="p-3">
                <Row>
                    <div>
                        <label htmlFor="" className='input-label'>Semester</label>
                        <Form.Select onChange={semesterChange} value={semesterValue}>
                            <option>choose semester</option>
                            <option value="1st Semester">1st semester</option>
                            <option value="2nd Semester">2nd semester</option>
                        </Form.Select>
                    </div>
                </Row>
            </Container>
        </Fragment>
    );
}

export default BscSemester;