import React, {Fragment, useState, useEffect, useContext} from 'react';
import {Button, Col, Container, Row} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import Form from "react-bootstrap/Form";
import BscSemester from "./BSCSemester";
import BscYear from "./BSCYear";
import logo from "./logos/JU_logo2.png";
import {Link, useParams} from "react-router-dom";
import axios from 'axios';

function Syllabus(props) {
    const { accessId ,curriculumId } = useParams();
    const [startingSession, setStartingSession] = useState('');
    const [endingSession, setEndingSession] = useState('');
    const [syllabuses, setSyllabuses] = useState([]);
    const [selectedOption,setSelectedOption] = useState('');
    const [program,setProgram] = useState('');
    const [session,setSession] = useState('');
    const [semesterValue,setSemesterValue] = useState('');
    const [yearValue,setYearValue] = useState('');

    useEffect(() => {
        if (curriculumId) {
            axios.get(`http://127.0.0.1:8000/api/curriculum/${curriculumId}/`)
                .then((res) => {
                    if (res.status === 200) {
                        setStartingSession(res.data.starting);
                        setEndingSession(res.data.ending);
                    } else {
                        console.error("Failed to fetch curriculum data from the server");
                    }
                })
                .catch(() => {
                    console.error("Something went wrong while fetching curriculum data");
                });
        }
    }, [curriculumId]);

    useEffect(() => {
        if (curriculumId) {
            axios.get(`http://127.0.0.1:8000/api/syllabus/?upCurriculum=${curriculumId}`)
                .then((res) => {
                    if (res.status === 200) {
                        if (res.data.length > 0) {
                            setSyllabuses(res.data);
                        }
                    } else {
                        console.error("Failed to fetch data from the server");
                    }
                })
                .catch(() => {
                    console.error("Something went wrong");
                });
        }
    }, [curriculumId]);
    
      
    const addSyllabus = () => {
        const requestData = {
            upCurriculum: parseInt(curriculumId, 10), 
            program: program,
            selectedOption: selectedOption, 
            yearValue: yearValue, 
            semesterValue: semesterValue, 
            session: session
        };
    
        axios
        .post('http://127.0.0.1:8000/api/syllabus/', requestData)
        .then((response) => {
            // Handle the response if needed
            console.log(response.data);
            setSyllabuses(prevSyllabuses => [...prevSyllabuses, response.data]);
        })
        .catch((err) => {
            console.log(err);
        });
    }
    const deleteSyllabus = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/syllabus/${id}/`)
            .then(() => {
                const newSyllabus = syllabuses.filter(t => {
                    return t.id !== id
                });
                setSyllabuses(newSyllabus);
            }).catch(() => {
                alert("Something went wrong");
            })
      }


    const yearChange = (e)=>{
        setYearValue(e.target.value);
    }

    const semesterChange = (e)=>{
        setSemesterValue(e.target.value);
    }

    const handleChange = (e)=>{
        setSelectedOption(e.target.value);
    }
    const programHandle = (e)=>{
        setProgram(e.target.value);
    }

    const sessionHandle = (e)=>{
        setSession(e.target.value);
    }

    const generateSessionOptions = () => {
        const sessions = [];
        if (startingSession && endingSession) {
            const startYear = parseInt(startingSession.split('-')[0]);
            const endYear = parseInt(endingSession.split('-')[0]);
            for (let year = startYear; year <= endYear; year++) {
                sessions.push(`${year}-${year + 1}`);
            }
        }
        return sessions;
    };
    const sessionOptions = generateSessionOptions();

    return (
        <Fragment>
            <Container className="Wrapper">
                <div className='row'>
                    <div className='col-4 Heading1'>
                        {/* <p>Curriculum: {startingSession} - {endingSession}</p> */}
                    </div>
                    <div className='col-4 Heading2'>
                        <h2 >Programs</h2>
                    </div>
                    <div className='col-4 Heading3'>
                        <img src={logo} alt="Logo" />
                    </div>
                </div>
                {accessId === '0' &&
                    <Row>
                        <Col>
                            <div>
                                <label className="pe-5 pb-2 input-label" htmlFor="">Program: </label> <input
                                name="pg"
                                className="form-check-input"
                                id="pg1"
                                type="radio"
                                value="bsc"
                                onChange={programHandle}
                                checked={program==="bsc"}
                                />
                                <label className="pe-5 pb-2" htmlFor="pg1">B.SC </label>
                                <input
                                    className="form-check-input"
                                    name="pg"
                                    id="pg2"
                                    type="radio"
                                    value="msc"
                                    onChange={programHandle}
                                    checked={program==="msc"}
                                />
                                <label className="pe-5 pb-2" htmlFor="pg2"> M.SC</label>
                            </div>
                            <div>
                                <label className="pe-5 pb-2 input-label" htmlFor="">System    :</label>
                                <input
                                className="form-check-input"
                                name="sys"
                                id="sys1"
                                type="radio"
                                value="semester"
                                onChange={handleChange}
                                checked={selectedOption==="semester"}
                                />
                                <label className="pe-5 pb-2" htmlFor="sys1">Semester</label>
                                <input
                                    className="form-check-input"
                                    name="sys"
                                    id="sys2"
                                    type="radio"
                                    value="year"
                                    onChange={handleChange}
                                    checked={selectedOption==="year"}
                                />
                                <label className="pe-5 pb-2" htmlFor="sys2">Year</label>
                            </div>
                            <div>
                                <label htmlFor="" className='input-label'>Starting Session</label>
                                <Form.Select onChange={sessionHandle} value={session} >
                                    <option value="">choose session</option>
                                    {sessionOptions.map((session) => (
                                        <option key={session} value={session}>{session}</option>
                                    ))}
                                </Form.Select>
                            </div>
                        </Col>
                    </Row>
                }
                {accessId === '0' &&
                    <Row>
                        {
                            (selectedOption !== "" && program !== "" && session !== "") ? (
                                selectedOption==="year" ?(
                                    <Fragment>
                                        <Col md={6} lg={6} sm={6} className="p-0 m-0">
                                            <BscYear yearChange={yearChange} yearValue={yearValue}/>
                                        </Col>
                                        <Col md={6} lg={6} sm={6} className="p-0 m-0"> </Col>
                                        
                                        <Button className="form-btn btn" onClick={addSyllabus}>Add</Button>
                                    </Fragment>
                                )  : (
                                    <Fragment>
                                        <Col md={6} lg={6} sm={6} className="p-0 m-0">
                                            <BscYear yearChange={yearChange} yearValue={yearValue} />
                                        </Col>
                                        <Col md={6} lg={6} sm={6} className="p-0 m-0">
                                            <BscSemester semesterValue={semesterValue} semesterChange={semesterChange} />
                                        </Col>
                                        <Button className="form-btn btn" onClick={addSyllabus}>Add</Button>
                                    </Fragment>
                                )
                            ) : (
                                <Col>
                                    <p>Please select all options.</p>
                                </Col>
                            )
                        }
                    </Row>
                }
                <Row className='pt-5'>
                    <table className='table table-bordered text-center table-hover border-dark'>
                    <thead>
                        <tr>
                            <th>Program</th>
                            <th>System</th>
                            <th>Starting Session</th>
                            <th>Year</th>
                            <th>Semester</th>
                            {accessId === '0' && <th>Delete</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {syllabuses.map((syllabus, index) => (
                                <tr key={index} className='nav-item'>
                                    <td>
                                        <Link to={`/peo/${accessId}/${curriculumId}/${syllabus.id}`} className='nav-link' >
                                            <span>{syllabus.program}</span>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/peo/${accessId}/${curriculumId}/${syllabus.id}`} className='nav-link' >
                                            <span>{syllabus.selectedOption}</span>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/peo/${accessId}/${curriculumId}/${syllabus.id}`} className='nav-link' >
                                            <span>{syllabus.session}</span>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/peo/${accessId}/${curriculumId}/${syllabus.id}`} className='nav-link' >
                                            <span>{syllabus.yearValue}</span>
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/peo/${accessId}/${curriculumId}/${syllabus.id}`} className='nav-link' >
                                            <span>{syllabus.semesterValue}</span>
                                        </Link>
                                    </td>
                                    {accessId === '0' &&
                                        <td>
                                            <FontAwesomeIcon icon={faTrash} onClick={()=>deleteSyllabus(syllabus.id)}/>
                                        </td>
                                    }
                                </tr>
                            ))
                            
                        }
                    </tbody>
                    </table>
                </Row>
                <div className='row'>
                    <div className='text-start'>
                    <Link to={`/curriculum/${accessId}`}>
                        <button type='submit' className='btn btn-warning'>Back</button>
                    </Link>
                    
                    </div>
                </div>
            </Container>
        </Fragment>
    );
}

export default Syllabus;