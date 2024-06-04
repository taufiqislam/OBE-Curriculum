import React, {Fragment, useContext, useState,useEffect} from 'react'
import {Link,useLocation,useParams} from 'react-router-dom'

export const Sidebar = () => {
    const location = useLocation();
    const { pathname } = location;
    const [accessId, setAccessId] = useState(true);
    const [curriculumId, setCurriculumId] = useState(true);
    const [syllabusId, setSyllabusId] = useState(true);
    const [courseId, setCourseId] = useState(true);
    const [showHome, setShowHome] = useState(true);
    const [showSyllabuses, setShowSyllabuses] = useState(true);
    const [showPrograms, setShowPrograms] = useState(true);
    const [showCourses, setShowCourses] = useState(true);


    useEffect(() => {
        const pathParts = pathname.split('/').filter(Boolean);
        if (pathParts.length <= 1) {
            setShowHome(false);
            setShowSyllabuses(false);
            setShowPrograms(false);
            setShowCourses(false);
        }
        else if (pathParts.length === 2) {
            setAccessId(parseInt(pathParts[1],10));
            setShowHome(true);
            setShowSyllabuses(false);
            setShowPrograms(false);
            setShowCourses(false);
        } else if (pathParts.length === 3) {
            setAccessId(parseInt(pathParts[1],10));
            setCurriculumId(parseInt(pathParts[2],10));
            setShowHome(false);
            setShowSyllabuses(true);
            setShowPrograms(false);
            setShowCourses(false);
        } else if (pathParts.length === 4) {
            setAccessId(parseInt(pathParts[1],10));
            setCurriculumId(parseInt(pathParts[2],10));
            setSyllabusId(parseInt(pathParts[3],10));
            setShowHome(false);
            setShowSyllabuses(false);
            setShowPrograms(true);
            setShowCourses(false);
        } else if (pathParts.length === 5) {
            setAccessId(parseInt(pathParts[1],10));
            setCurriculumId(parseInt(pathParts[2],10));
            setSyllabusId(parseInt(pathParts[3],10));
            setCourseId(parseInt(pathParts[4],10));
            setShowHome(false);
            setShowSyllabuses(false);
            setShowPrograms(false);
            setShowCourses(true);
        }
    }, [pathname]);
    
    
  return (
   <Fragment>
       <div className="nameMain">
           <div className='infoDiv'>
               <img src="https://juniv.edu/storage/image/teacher/e5Og72xM6ziVhQm05xvu9rFVWOUTnsTih451EfgP.jpg" alt=""/>
               <h4>Dr. Abu Sayed Md. Mostafizur Rahaman</h4>
               <p>Professor</p>
               <p>Department Of Computer Science And Engineering</p>
           </div>
           <hr/>
           <ul className="" id="menu">
                <li className="nav-item">
                <Link to="/" className="nav-link">
                    <span>Home</span>
                </Link>
                </li>
                {showHome &&  (
                    <li className="nav-item">
                    <Link to={`/mission/${accessId}`} className="nav-link" >
                        <span>Mission</span>
                    </Link>
                    </li>
                )}
                {showHome && (
                    <li className="nav-item">
                    <Link to={`/vision/${accessId}`} className="nav-link">
                        <span>Vision</span>
                    </Link>
                    </li>
                )}
                {showHome && (
                    <li className="nav-item">
                    <Link to={`/curriculum/${accessId}`} class="nav-link">
                        <span>Curriculum</span>
                    </Link>
                    </li>
                )}
                
                {showSyllabuses && (
                    <li className="nav-item">
                    <Link to={`/syllabus/${accessId}/${curriculumId}`} className="nav-link">
                        <span>Program</span>
                    </Link>
                    </li>
                )}

                {showSyllabuses && (
                    <li className="nav-item">
                    <Link to={`/curriculum/${accessId}/`} class="nav-link">
                        <button className='btn btn-warning'>Back</button>
                    </Link>
                    </li>
                )}
                

                {showPrograms && (
                    <li className="nav-item">
                    <Link to={`/peo/${accessId}/${curriculumId}/${syllabusId}`} className="nav-link">
                        <span>Program Educational Objectives (PEO)</span>
                    </Link>
                    </li>
                )}
                {showPrograms && (
                     <li className="nav-item">
                     <Link to={`/peomapmission/${accessId}/${curriculumId}/${syllabusId}`} className="nav-link">
                         <span>Mapping Of PEO and Mission</span>
                     </Link>
                    </li>
                )}
                {showPrograms && (
                    <li className="nav-item">
                    <Link to={`/plo/${accessId}/${curriculumId}/${syllabusId}`} className="nav-link">
                        <span>Program Learning Outcomes (PLO)</span>
                    </Link>
                    </li>
                )}

                {showPrograms && (
                    <li className="nav-item">
                    <Link to={`/plomappeo/${accessId}/${curriculumId}/${syllabusId}`} className="nav-link">
                        <span>Mapping Of PLO and PEO</span>
                    </Link>
                    </li>
                )}
                {showPrograms && (
                    <li className="nav-item">
                    <Link to={`/course/${accessId}/${curriculumId}/${syllabusId}`} className="nav-link">
                        <span>Courses</span>
                    </Link>
                    </li>
                )}

                {showPrograms && (
                    <li className="nav-item">
                    <Link to={`/syllabus/${accessId}/${curriculumId}`} class="nav-link">
                        <button className='btn btn-warning'>Back</button>
                    </Link>
                    </li>
                )}
                

                {showCourses && (
                    <li className="nav-item">
                    <Link to={`/courseinfo/${accessId}/${curriculumId}/${syllabusId}/${courseId}`} className="nav-link">
                        <span>Course Information</span>
                    </Link>
                    </li>
                )}

                {showCourses && (
                    <li className="nav-item">
                    <Link to={`/courseobjective/${accessId}/${curriculumId}/${syllabusId}/${courseId}`} className="nav-link">
                        <span>Course Objectives</span>
                    </Link>
                    </li>
                )}

                {showCourses && (
                    <li className="nav-item">
                    <Link to={`/clo/${accessId}/${curriculumId}/${syllabusId}/${courseId}`} className="nav-link">
                        <span>Course Learning Outcomes (CLO)</span>
                    </Link>
                    </li>
                )}

                {showCourses && (
                    <li className="nav-item">
                    <Link to={`/clomapplo/${accessId}/${curriculumId}/${syllabusId}/${courseId}`} className="nav-link">
                       <span>CLO-PLO Correlation Matrix</span>
                    </Link>
                    </li>
                )}

                {/* {showCloPloReasoning && (
                    <li className="nav-item">
                    <Link to='/cloPloReasoning' className="nav-link">
                        <span>CLO & PLO Reasoning</span>
                    </Link>
                    </li>
                )} */}

                {showCourses && (
                    <li className="nav-item">
                    <Link to={`/ilo/${accessId}/${curriculumId}/${syllabusId}/${courseId}`} className="nav-link">
                        <span>Intended Learning Outcomes (ILO)</span>
                    </Link>
                    </li>
                )}

                {showCourses && (
                    <li className="nav-item">
                    <Link to={`/outline/${accessId}/${curriculumId}/${syllabusId}/${courseId}`} className="nav-link">
                        <span>Course Content Outline</span>
                    </Link>
                    </li>
                )}
                {showCourses && (
                    <li className="nav-item">
                    <Link to={`/courseassessment/${accessId}/${curriculumId}/${syllabusId}/${courseId}`} className="nav-link">
                        <span>Course Assessment</span>
                    </Link>
                    </li>
                )}

                
                {showCourses && (
                    <li className="nav-item">
                    <Link to={`/bookreference/${accessId}/${curriculumId}/${syllabusId}/${courseId}`} className="nav-link">
                        <span>Reference Books</span>
                    </Link>
                    </li>
                )}  
                
                {showCourses && (
                    <li className="nav-item">
                    <Link to={`/course/${accessId}/${curriculumId}/${syllabusId}`} class="nav-link">
                        <button className='btn btn-warning'>Back</button>
                    </Link>
                    </li>
                )}

           </ul>
       </div>
   </Fragment>
  )
}
