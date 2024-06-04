import React, { useState,useEffect,useContext} from 'react'
import { BookReferenceForm } from './BookReferenceForm'
import {v4 as uuidv4} from 'uuid'
import { EditBookReferenceForm } from './EditBookReferenceForm';
import logo from './logos/JU_logo2.png';
import {Link,useParams} from 'react-router-dom'
import {BookReference} from "./Bookreference";
import axios from 'axios';
uuidv4()

export const BookReferenceWrapper = () => {

    const { accessId, curriculumId, syllabusId, courseId } = useParams();
    const [bookReferences, setBookReferences] = useState([]);
    useEffect(() => {
      axios.get(`http://127.0.0.1:8000/api/book/?upCourse=${courseId}`)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.length > 0) {
              setBookReferences(res.data);
            }
          } else {
            console.error("Failed to fetch data from the server");
          }
        })
        .catch(() => {
          console.error("Something went wrong");
        });
    }, []);

    const addBookReference = (name,author,publisher,year,edition) => {
    
      const requestData = {
        upCourse : courseId,
        name: name,
        author: author,
        publisher:publisher,
        year:year,
        edition:edition,
        isEditing: false
      };
      
      axios
        .post('http://127.0.0.1:8000/api/book/', requestData)
        .then((response) => {
          // Handle the response if needed
          console.log(response.data);
          setBookReferences(prevbooks => [...prevbooks, response.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    
    const deleteBookReference = (id) => {
      axios.delete(`http://127.0.0.1:8000/api/book/${id}/`)
          .then(() => {
              const newbooks = bookReferences.filter(t => {
                  return t.id !== id
              });
              setBookReferences(newbooks);
          }).catch(() => {
              alert("Something went wrong");
          })
  }
      const editBookReference = id => {
        setBookReferences(bookReferences.map(bookReference => bookReference.id === id ? {...bookReference, isEditing: !bookReference.isEditing} : bookReference))
      }
      const editDescriptionBookReference = (name,author,publisher,year,edition, id) => {
    const requestData = {
        upCourse : courseId,
        name: name,
        author: author,
        publisher:publisher,
        year:year,
        edition:edition
    };
  
    axios
      .put(`http://127.0.0.1:8000/api/book/${id}/`, requestData)
      .then((response) => {
        // Handle the response if needed
        setBookReferences(prevbooks =>
          prevbooks.map(bookReference =>
            bookReference.id === id
              ? { ...bookReference, name,  author,publisher,year,edition, isEditing: !bookReference.isEditing }
              : bookReference
          )
        );
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

    const isComplete = () => {
      return bookReferences.length !== 0;
    };
    
  return (
    <div className='Wrapper' id='bookreference'>
        <div className='row'>
          <div className='col-4 Heading1'>
            {/* <p>Curriculum: {upCurriculums.starting} - {upCurriculums.ending}</p>
            <p>Program: {upSyllabuses.program} {upSyllabuses.selectedOption} {upSyllabuses.yearValue} {upSyllabuses.semesterValue} {upSyllabuses.session}</p>
            <p>Course: {upCourses.code}</p> */}
          </div>
          <div className='col-4 Heading2'>
            <h2 >Reference Books</h2>
          </div>
          <div className='col-4 Heading3'>
            <img src={logo} alt="Logo" />
          </div>
        </div>
        {accessId === '0' &&
        <BookReferenceForm addBookReference={addBookReference}/>
        }
        <table className='table table-bordered text-center table-hover border-dark'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Year</th>
              <th>Edition</th>
              {accessId === '0' &&
              <th></th>
              }
            </tr>
          </thead>
          <tbody>
            {bookReferences.map((bookReference, index) => (
              
              bookReference.isEditing ? (
                <EditBookReferenceForm editBookReference={editDescriptionBookReference} bookReference={bookReference}/>
              ) : (
                <BookReference bookReference={bookReference} key={bookReference.id} index={index} deleteBookReference={deleteBookReference} editBookReference={editBookReference} accessId={accessId}/>
                )))
                
            }
          </tbody>
        </table>
        <div className='row'>
            <div className='text-start'>
              <Link to={`/courseassessment/${accessId}/${curriculumId}/${syllabusId}/${courseId}`}>
                <button type='submit' className='btn btn-warning'>Back</button>
              </Link>
              
            </div>
        </div>
    </div>
  )
}
