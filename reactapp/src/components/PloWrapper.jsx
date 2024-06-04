import React, {useContext, useState} from 'react'
import { PloForm } from './PloForm'
import {v4 as uuidv4} from 'uuid'
import { Plo } from './Plo'
import { EditPloForm } from './EditPloForm';
import logo from './logos/JU_logo2.png';
import {Link, useParams} from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
uuidv4()

export const PloWrapper = () => {

    const [plos, setPlos] = useState([]);
    const { accessId, curriculumId, syllabusId } = useParams();
    useEffect(() => {
      axios.get(`http://127.0.0.1:8000/api/plo/?upSyllabus=${syllabusId}`)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.length > 0) {
              setPlos(res.data);
            }
          } else {
            console.error("Failed to fetch data from the server");
          }
          
        }).catch(() => {
          alert("Something went wrong");
        })
    }, [])
    const addPlo = plos => {
      const requestData = {upSyllabus: syllabusId, descriptionPLO: plos, isEditing: false};
    
      axios
        .post('http://127.0.0.1:8000/api/plo/', requestData)
        .then((response) => {
          // Handle the response if needed
          console.log(response.data);
          setPlos(prevplos => [...prevplos, response.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const deletePlo = (id) => {
      axios.delete(`http://127.0.0.1:8000/api/plo/${id}/`)
          .then(() => {
              const newplo = plos.filter(t => {
                  return t.id !== id
              });
              setPlos(newplo);
          }).catch(() => {
              alert("Something went wrong");
          })
  }

    const editPlo = id => {
        setPlos(plos.map(plo => plo.id === id ? {...plo, isEditing: !plo.isEditing} : plo))
    }
   

    const isComplete = () => {
      return plos.length !== 0;
    };
    const editDescription = (descriptionPLO, id) => {
    
    const requestData = {upSyllabus: syllabusId, descriptionPLO: descriptionPLO };

    axios
      .put(`http://127.0.0.1:8000/api/plo/${id}/`, requestData)
      .then((response) => {
        // Handle the response if needed
        setPlos(prevplos => prevplos.map(plo => plo.id === id ? {...plo,descriptionPLO, isEditing: !plo.isEditing} : plo))
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);      
      });
    }
  return (
    <div className='Wrapper' id='plo'>
        <div className='row'>
          <div className='col-4 Heading1'>
            {/* <p>Curriculum: {upCurriculums.starting} - {upCurriculums.ending}</p>
            <p>Program: {upSyllabuses.program} {upSyllabuses.selectedOption} {upSyllabuses.yearValue} {upSyllabuses.semesterValue} {upSyllabuses.session}</p> */}
          </div>
          <div className='col-4 Heading2'>
            <h2>Program Educational Outcomes (plo)</h2>
          </div>
          <div className='col-4 Heading3'>
            <img src={logo} alt="Logo" />
          </div>
        </div>
        {accessId === '0' &&
          <PloForm addPlo={addPlo}/>
        }
        <table className='table table-bordered table-hover text-center border-dark'>
          <thead>
            <tr>
              <th>plo ID</th>
              <th>plo Description</th>
              {accessId === '0' &&
                <th></th>
              }
            </tr>
          </thead>
          <tbody>
            {plos.map((plo, index) => (
              
              plo.isEditing ? (
                <EditPloForm editPlo={editDescription} descriptionPLO={plo}/>
              ) : (
                <Plo descriptionPLO={plo} key={plo.id} index={index} deletePlo={deletePlo} editPlo={editPlo} accessId={accessId}/>
                )))
                
            }
          </tbody>
        </table>
        <div className='row'>
            <div className='col-6 text-start'>
              <Link to={`/peomapmission/${accessId}/${curriculumId}/${syllabusId}`}>
                <button type='submit' className='btn btn-warning'>Back</button>
              </Link>
              
            </div>
            <div className='col-6 text-end'>
              <Link
                    to={isComplete() ? `/plomappeo/${accessId}/${curriculumId}/${syllabusId}` : '#'}
                    onClick={(e) => {
                        if (!isComplete()) {
                            e.preventDefault();
                            alert("Please add at least one PLO.");
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