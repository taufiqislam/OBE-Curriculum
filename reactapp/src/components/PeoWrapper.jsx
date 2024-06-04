import React, {useEffect, useContext, useState} from 'react'
import { PeoForm } from './PeoForm'
import {v4 as uuidv4} from 'uuid'
import { Peo } from './Peo'
import { EditPeoForm } from './EditPeoForm';
import logo from './logos/JU_logo2.png';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
uuidv4()

export const PeoWrapper = () => {

    const [peos, setPeos] = useState([]);
    const { accessId, curriculumId, syllabusId } = useParams();
    useEffect(() => {
      axios.get(`http://127.0.0.1:8000/api/peo/?upSyllabus=${syllabusId}`)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.length > 0) {
              setPeos(res.data);
            }
          } else {
            setPeos(null);
            console.error("Failed to fetch data from the server");
          }
          
        }).catch(() => {
          alert("Something went wrong");
        })
    }, [])
    const addPeo = peos => {
      const requestData = {upSyllabus: syllabusId, descriptionPEO: peos, isEditing: false};
    
      axios
        .post('http://127.0.0.1:8000/api/peo/', requestData)
        .then((response) => {
          // Handle the response if needed
          console.log(response.data);
          setPeos(prevPeos => [...prevPeos, response.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const deletePeo = (id) => {
      axios.delete(`http://127.0.0.1:8000/api/peo/${id}/`)
          .then(() => {
              const newPeo = peos.filter(t => {
                  return t.id !== id
              });
              setPeos(newPeo);
          }).catch(() => {
              alert("Something went wrong");
          })
  }

    const editPeo = id => {
        setPeos(peos.map(peo => peo.id === id ? {...peo, isEditing: !peo.isEditing} : peo))
    }
   

    const isComplete = () => {
      return peos.length !== 0;
    };
    const editDescription = (descriptionPEO, id) => {
    
    const requestData = {upSyllabus: syllabusId, descriptionPEO: descriptionPEO };

    axios
      .put(`http://127.0.0.1:8000/api/peo/${id}/`, requestData)
      .then((response) => {
        // Handle the response if needed
        setPeos(prevPeos => prevPeos.map(peo => peo.id === id ? {...peo,descriptionPEO, isEditing: !peo.isEditing} : peo))
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);      
      });
}
  return (
    <div className='Wrapper' id='peo'>
        <div className='row'>
          <div className='col-4 Heading1'>
            {/* <p>Curriculum: {upCurriculums.starting} - {upCurriculums.ending}</p>
            <p>Program: {upSyllabuses.program} {upSyllabuses.selectedOption} {upSyllabuses.yearValue} {upSyllabuses.semesterValue} {upSyllabuses.session}</p> */}
          </div>
          <div className='col-4 Heading2'>
            <h2>Program Educational Outcomes (PEO)</h2>
          </div>
          <div className='col-4 Heading3'>
            <img src={logo} alt="Logo" />
          </div>
        </div>
        {accessId === '0' && <PeoForm addPeo={addPeo}/> }
        
        <table className='table table-bordered table-hover text-center border-dark'>
          <thead>
            <tr>
              <th>PEO ID</th>
              <th>PEO Description</th>
              {accessId === '0' && <th></th>}
            </tr>
          </thead>
          <tbody>
            {peos.map((peo, index) => (
              
              peo.isEditing ? (
                <EditPeoForm editPeo={editDescription} descriptionPEO={peo}/>
              ) : (
                <Peo descriptionPEO={peo} key={peo.id} index={index} deletePeo={deletePeo} editPeo={editPeo} accessId={accessId}/>
                )))
                
            }
          </tbody>
        </table>
        <div className='row'>
            <div className='col-6 text-start'>
              <Link to={`/syllabus/${accessId}/${curriculumId}`}>
                <button type='submit' className='btn btn-warning'>Back</button>
              </Link>
              
            </div>
            <div className='col-6 text-end'>
              <Link
                  to={isComplete() ? `/peomapmission/${accessId}/${curriculumId}/${syllabusId}` : '#'}
                  onClick={(e) => {
                      if (!isComplete()) {
                          e.preventDefault();
                          alert("Please add at least one PEO.");
                      }
                  }}
              >
                  <button
                      type='button'
                      className={`form-btn btn ${isComplete() ? '' : 'disabled'}`}
                  >
                      Next
                  </button>
              </Link>
              
            </div>
        </div>


    </div>
  )
}
