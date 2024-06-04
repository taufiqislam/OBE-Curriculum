import React, {useState, useContext, useEffect} from 'react'
import { CourseForm } from './CourseForm'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {v4 as uuidv4} from 'uuid'
import { EditCourseForm } from './EditCourseForm';
import logo from './logos/JU_logo2.png';
import {Link, useParams} from 'react-router-dom'
import axios from 'axios';
uuidv4()

export const CourseWrapper = () => {
    const { accessId, curriculumId, syllabusId } = useParams();
    const [courses, setCourses] = useState([])

    useEffect(() => {
        if (syllabusId) {
            axios.get(`http://127.0.0.1:8000/api/course/?upSyllabus=${syllabusId}`)
                .then((res) => {
                    if (res.status === 200) {
                        if (res.data.length > 0) {
                            setCourses(res.data);
                        }
                    } else {
                        console.error("Failed to fetch data from the server");
                    }
                })
                .catch(() => {
                    console.error("Something went wrong");
                });
        }
    }, [syllabusId]);
    
    const addCourse = (code, title) => {
    const requestData = {upSyllabus: syllabusId, code: code, title: title, isEditing: false};
    
    axios
        .post('http://127.0.0.1:8000/api/course/', requestData)
        .then((response) => {
        // Handle the response if needed
        console.log(response.data);
        setCourses(prevcourses => [...prevcourses, response.data]);
        })
        .catch((err) => {
        console.log(err);
        });
    }
    const deleteCourse = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/course/${id}/`)
            .then(() => {
                const newcourse = courses.filter(t => {
                    return t.id !== id
                });
                setCourses(newcourse);
            }).catch(() => {
                alert("Something went wrong");
            })
    }

    const editCourse = id => {
      setCourses(courses.map(course => course.id === id ? {...course, isEditing: !course.isEditing} : course))
    }
    const editDescriptionCourse = (code, title, id) => {
    
        const requestData = {upSyllabus: syllabusId, code: code, title: title};
    
        axios
          .put(`http://127.0.0.1:8000/api/course/${id}/`, requestData)
          .then((response) => {
            // Handle the response if needed
            setCourses(prevcourses => prevcourses.map(course => course.id === id ? {...course, code, title, isEditing: !course.isEditing} : course))
            console.log(response.data);
          })
          .catch((err) => {
            console.log(err);      
          });
    }

  const isComplete = () => {
      return courses.length !== 0;
  };

    
  return (
    <div className='Wrapper' id='course'>
      <div className='row'>
          <div className='col-4 Heading1'>
    
          </div>
          <div className='col-4 Heading2'>
           <h2>Courses</h2>
          </div>
          <div className='col-4 Heading3'>
            <img src={logo} alt="Logo" />
          </div>
        </div>
        {accessId === '0' &&
          <CourseForm addCourse={addCourse}/>
        }
        <table className='table table-bordered table-hover border-dark text-center'>
          <thead>
            <tr>
              <th>Course Code</th>
              <th>Course Title</th>
              {accessId === '0' &&
                <th></th>
              }
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              
              course.isEditing ? (
                <EditCourseForm editCourse={editDescriptionCourse} course={course}/>
              ) : (
                <tr className='nav-item'>
                    <td>
                        <Link to={`/courseinfo/${accessId}/${curriculumId}/${syllabusId}/${course.id}`} className='nav-link' >
                        <span>{course.code}</span>
                        </Link>
                    </td>
                    <td>
                        <Link to={`/courseinfo/${accessId}/${curriculumId}/${syllabusId}/${course.id}`} className='nav-link' >
                        <span>{course.title}</span>
                        </Link>
                    </td>
                    {accessId === '0' &&
                    <td>
                    <FontAwesomeIcon icon={faPenToSquare} onClick={() => editCourse(course.id)}/>
                    <FontAwesomeIcon icon={faTrash} onClick={() => deleteCourse(course.id)}/>
                    </td>
                    }
                </tr>
                )))
                
            }
          </tbody>
        </table>
        
        <div className='row'>
            <div className='text-start'>
              <Link to={`/plomappeo/${accessId}/${curriculumId}/${syllabusId}`}>
                <button type='submit' className='btn btn-warning'>Back</button>
              </Link>
              
            </div>
        </div>
    </div>
  )
}
