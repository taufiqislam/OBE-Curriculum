import React, {useContext, useState} from 'react'
import { KnowledgeWrapper } from './KnowldedgeWrapper'
import { SkillWrapper } from './SkillWrapper'
import { AttitudeWrapper } from './AttitudeWrapper'
import logo from './logos/JU_logo2.png';
import {Link,useParams} from 'react-router-dom'

export const IloWrapper = () => {

  const { accessId, curriculumId, syllabusId, courseId } = useParams();
  const [knowledges, setKnowledges] = useState([]);

  const [skills, setSkills] = useState([]);

  const [attitudes, setAttitudes] = useState([]);
  
  const isComplete = () => {
    return (knowledges.length !== 0) && (skills.length !== 0) && (attitudes.length !== 0);
  };

  return (
    <div className='Wrapper' id='ilo'>
        <div className='row'>
          <div className='col-4 Heading1'>
            {/* <p>Curriculum: {upCurriculums.starting} - {upCurriculums.ending}</p>
            <p>Program: {upSyllabuses.program} {upSyllabuses.selectedOption} {upSyllabuses.yearValue} {upSyllabuses.semesterValue} {upSyllabuses.session}</p>
            <p>Course: {upCourses.code}</p> */}
          </div>
          <div className='col-4 Heading2'>
            <h2 >Intended Learning Outcomes (ILO)</h2>
          </div>
          <div className='col-4 Heading3'>
            <img src={logo} alt="Logo" />
          </div>
        </div>
          <KnowledgeWrapper knowledges={knowledges} setKnowledges={setKnowledges}/>
          <SkillWrapper skills={skills} setSkills={setSkills} />
          <AttitudeWrapper attitudes={attitudes} setAttitudes={setAttitudes} />
        
        <div className='row'>
            <div className='col-6 text-start'>
              <Link to={`/clomapplo/${accessId}/${curriculumId}/${syllabusId}/${courseId}`}>
                <button type='submit' className='btn btn-warning'>Back</button>
              </Link>
              
            </div>
            <div className='col-6 text-end'>
              <Link
                  to={isComplete() ? `/outline/${accessId}/${curriculumId}/${syllabusId}/${courseId}` : '#'}
                  onClick={(e) => {
                      if (!isComplete()) {
                          e.preventDefault();
                          alert("Please add at least one ILO of each type.");
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
