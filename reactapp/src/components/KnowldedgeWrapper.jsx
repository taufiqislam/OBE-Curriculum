import React, {useContext, useState,useEffect} from 'react'
import { KnowledgeForm } from './KnowledgeForm'
import {v4 as uuidv4} from 'uuid'
import { Knowledge } from './Knowledge'
import { EditKnowledgeForm } from './EditKnowledgeForm';
import {useParams} from 'react-router-dom';
import axios from 'axios';
uuidv4()

export const KnowledgeWrapper = (props) => {

  const { accessId, curriculumId, syllabusId, courseId } = useParams();
  const { knowledges, setKnowledges } = props;
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/knowledge/?upCourse=${courseId}`)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.length > 0) {
            setKnowledges(res.data);
          }
        } else {
          console.error("Failed to fetch data from the server");
        }
        
      }).catch(() => {
        alert("Something went wrong");
      })
  }, [])
  const addKnowledge = (description) => {
  
    const requestData = {
      upCourse : courseId,
      description:description,

      isEditing: false
    };
    
    axios
      .post('http://127.0.0.1:8000/api/knowledge/', requestData)
      .then((response) => {
        // Handle the response if needed
        console.log(response.data);
        setKnowledges(prevknowledges => [...prevknowledges, response.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  const deleteKnowledge = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/knowledge/${id}/`)
        .then(() => {
            const newknowledge = knowledges.filter(t => {
                return t.id !== id
            });
            setKnowledges(newknowledge);
        }).catch(() => {
            alert("Something went wrong");
        })
}
    const editKnowledge = id => {
      setKnowledges(knowledges.map(knowledge => knowledge.id === id ? {...knowledge, isEditing: !knowledge.isEditing} : knowledge))
    }
    const editDescriptionKnowledge = (description,  id) => {
  const requestData = {
    upCourse : courseId,
    description: description,
  };

  axios
    .put(`http://127.0.0.1:8000/api/knowledge/${id}/`, requestData)
    .then((response) => {
      // Handle the response if needed
      setKnowledges(prevknowledges =>
        prevknowledges.map(knowledge =>
          knowledge.id === id
            ? { ...knowledge, description,   isEditing: !knowledge.isEditing }
            : knowledge
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
          <KnowledgeForm addKnowledge={addKnowledge}/>
        }
        <table className='table table-bordered table-hover border-dark text-center'>
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
            {knowledges.map((knowledge, index) => (
              
              knowledge.isEditing ? (
                <EditKnowledgeForm editKnowledge={editDescriptionKnowledge} description={knowledge}/>
              ) : (
                <Knowledge description={knowledge} key={knowledge.id} index={index} deleteKnowledge={deleteKnowledge} editKnowledge={editKnowledge} accessId={accessId}/>
                )))
                
            }
          </tbody>
        </table>
    </div>
  )
}
