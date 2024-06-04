import React, { useState, useContext,useEffect} from 'react'
import { AttitudeForm } from './AttitudeForm'
import {v4 as uuidv4} from 'uuid'
import { Attitude } from './Attitude'
import { EditAttitudeForm } from './EditAttitudeForm';
import {useParams} from 'react-router-dom';
import axios from 'axios';
uuidv4()

export const AttitudeWrapper = (props) => {

  const { accessId, curriculumId, syllabusId, courseId } = useParams();
  const {attitudes, setAttitudes} = props;
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/attitude/?upCourse=${courseId}`)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.length > 0) {
            setAttitudes(res.data);
          }
        } else {
          console.error("Failed to fetch data from the server");
        }
      })
      .catch(() => {
        console.error("Something went wrong");
      });
  }, []);

  const addAttitude = (description) => {
  
    const requestData = {
      upCourse : courseId,
      description:description,
      isEditing: false
    };
    
    axios
      .post('http://127.0.0.1:8000/api/attitude/', requestData)
      .then((response) => {
        // Handle the response if needed
        console.log(response.data);
        setAttitudes(prevattitudes => [...prevattitudes, response.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  const deleteAttitude = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/attitude/${id}/`)
        .then(() => {
            const newAttitude = attitudes.filter(t => {
                return t.id !== id
            });
            setAttitudes(newAttitude);
        }).catch(() => {
            alert("Something went wrong");
        })
}
    const editAttitude = id => {
      setAttitudes(attitudes.map(attitude => attitude.id === id ? {...attitude, isEditing: !attitude.isEditing} : attitude))
    }
    const editDescriptionAttitude = (description,  id) => {
  const requestData = {
    upCourse : courseId,
    description: description,
  };

  axios
    .put(`http://127.0.0.1:8000/api/attitude/${id}/`, requestData)
    .then((response) => {
      // Handle the response if needed
      setAttitudes(prevattitudes =>
        prevattitudes.map(attitude =>
          attitude.id === id
            ? { ...attitude, description,   isEditing: !attitude.isEditing }
            : attitude
        )
      );
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

    
  return (
    <div className='Wrapper'>
        {accessId === '0' &&
        <AttitudeForm addAttitude={addAttitude}/>
        }
        <table className='table table-bordered text-center table-hover border-dark'>
          <thead>
            <tr>
              <th>ILO ID</th>
              <th>ILO Description</th>
              {accessId === '0' &&
              <th></th>
              }
            </tr>
          </thead>
          <tbody>
            {attitudes.map((attitude, index) => (
              
              attitude.isEditing ? (
                <EditAttitudeForm editAttitude={editDescriptionAttitude} description={attitude}/>
              ) : (
                <Attitude description={attitude} key={attitude.id} index={index} deleteAttitude={deleteAttitude} editAttitude={editAttitude} accessId={accessId}/>
                )))
                
            }
          </tbody>
        </table>
    </div>
  )
}
