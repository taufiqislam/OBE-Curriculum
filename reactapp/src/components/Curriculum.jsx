import React, { useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import logo from './logos/JU_logo2.png';
import { Link ,useParams} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function Curriculum() {
    const { accessId } = useParams();
    const [curriculums, setCurriculums] = useState([]);
    const [inputdata, setInputdata] = useState({ starting: "", ending: "" });
    const [index] = useState();
    const [bolin, setBolin] = useState(false);
    const { starting, ending } = inputdata;

    const sessions = [
        "2018-2019",
        "2019-2020",
        "2020-2021",
        "2021-2022",
        "2022-2023",
        "2023-2024",
        "2024-2025"
    ];

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/curriculum/")
            .then((res) => {
                if (res.status === 200) {
                    if (res.data.length > 0) {
                        setCurriculums(res.data);
                    }
                } else {
                    console.error("Failed to fetch data from the server");
                }
            })
            .catch(() => {
                console.error("Something went wrong");
            });
    }, []);

    function data(e) {
        setInputdata({ ...inputdata, [e.target.name]: e.target.value });
    }

    function addinputdata() {
        if (starting === "" && ending === "") {
            alert("Select Starting and ending sessions");
        } else {
            const requestData = { starting: starting, ending: ending };

            axios
                .post('http://127.0.0.1:8000/api/curriculum/', requestData)
                .then((response) => {
                    setCurriculums(prevCurriculums => [...prevCurriculums, response.data]);
                })
                .catch((err) => {
                    console.log(err);
                });
            setInputdata({ starting: "", ending: "" });
        }
    }

    function deletedata(id) {
        axios.delete(`http://127.0.0.1:8000/api/curriculum/${id}/`)
            .then(() => {
                const newCurriculum = curriculums.filter(t => {
                    return t.id !== id;
                });
                setCurriculums(newCurriculum);
            }).catch(() => {
                alert("Something went wrong");
            })
    }

    function updateinfo() {
        let total = [...curriculums];
        total.splice(index, 1, { starting, ending });
        setCurriculums(total);
        setBolin(false);
        setInputdata({ starting: "", ending: "" });
    }

    const filteredEndingSessions = starting 
        ? sessions.filter(session => sessions.indexOf(session) >= sessions.indexOf(starting))
        : sessions;

    return (
        <div className='container Wrapper'>
            <div className='row'>
                <div className='col-4 Heading1'></div>
                <div className='col-4 Heading2'>
                    <h2>Curriculum</h2>
                </div>
                <div className='col-4 Heading3'>
                    <img src={logo} alt="Logo" />
                </div>
            </div>
            {accessId === '0' && 
                <div className='ObeForm'>
                    <div className='row'>
                        <div className='col-5 Drop'>
                            <label htmlFor="dropdown" className='input-label'>Starting Session:</label>
                            <Form.Select id="dropdown" value={inputdata.starting || ""} name="starting" autoComplete='off' onChange={data}>
                                <option>Open this select menu</option>
                                {sessions.map(session => (
                                    <option key={session} value={session}>{session}</option>
                                ))}
                            </Form.Select>
                        </div>
                        <div className='col-5'>
                            <label htmlFor="dropdown" className='input-label'>Ending Session:</label>
                            <Form.Select id="dropdown" value={inputdata.ending || ""} name="ending" autoComplete='off' onChange={data}>
                                <option>Open this select menu</option>
                                {filteredEndingSessions.map(session => (
                                    <option key={session} value={session}>{session}</option>
                                ))}
                            </Form.Select>
                        </div>
                        <div className='col-2'>
                            <button className='form-btn btn pt-3 pb-3 px-5' onClick={!bolin ? addinputdata : updateinfo}>{!bolin ? `Add` : `Update data`}</button>
                        </div>
                    </div>
                </div>
            }
            <table className='table table-bordered text-center table-hover bg-dark'>
                <thead>
                    <tr>
                        <th>Starting Session</th>
                        <th>Ending Session</th>
                        {accessId === '0' && <th>Delete</th> }
                    </tr>
                </thead>
                <tbody>
                    {curriculums && curriculums.map((item, i) => (
                        <tr key={i} className='nav-item'>
                            <td>
                                <Link to={`/syllabus/${accessId}/${item.id}`} className='nav-link'>
                                    <span>{item.starting}</span>
                                </Link>
                            </td>
                            <td>
                                <Link to={`/syllabus/${accessId}/${item.id}`} className='nav-link'>
                                    <span>{item.ending}</span>
                                </Link>
                            </td>
                            {accessId === '0' &&
                                <td>
                                    <FontAwesomeIcon icon={faTrash} onClick={() => deletedata(item.id)} />
                                </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='row'>
                <Link to={`/vision/${accessId}`}>
                    <button type='submit' className='btn btn-warning'>Back</button>
                </Link>
            </div>
        </div>
    )
}
