import React, { useState, useEffect,useContext } from 'react';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CourseContentOutline = ({ addOutline }) => {
  const { curriculumId, syllabusId, courseId } = useParams();
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [faceToFaceHours, setFaceToFaceHours] = useState('');
  const [lectureHours, setLectureHours] = useState('');
  const [exerciseHours, setExerciseHours] = useState('');
  const [practicalHours, setPracticalHours] = useState('');
  const [othersHours, setOthersHours] = useState('');
  const [nonFaceToFaceHours, setNonFaceToFaceHours] = useState('');
  const [independentLearningHours, setIndependentLearningHours] = useState('');
  const [totalSLTHours, setTotalSLTHours] = useState('');
  const [clos, setClos] = useState([]);
  const [knows, setKnows] = useState([]);
  const [atts, setAtts] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedClos, setSelectedClos] = useState([]);
  const [selectedKnows, setSelectedKnows] = useState([]);
  const [selectedAtts, setSelectedAtts] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/clo/?upCourse=${courseId}`)
      .then(response => {
        setClos(response.data);
      })
      .catch(error => {
        console.error('Error fetching CLOs:', error);
      });

    axios.get(`http://127.0.0.1:8000/api/knowledge/?upCourse=${courseId}`)
      .then(response => {
        setKnows(response.data);
      })
      .catch(error => {
        console.error('Error fetching Knowledge:', error);
      });

    axios.get(`http://127.0.0.1:8000/api/attitude/?upCourse=${courseId}`)
      .then(response => {
        setAtts(response.data);
      })
      .catch(error => {
        console.error('Error fetching Attitudes:', error);
      });

    axios.get(`http://127.0.0.1:8000/api/skill/?upCourse=${courseId}`)
      .then(response => {
        setSkills(response.data);
      })
      .catch(error => {
        console.error('Error fetching Skills:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    addOutline(
      heading,
      description,

      lectureHours,
      exerciseHours,
      practicalHours,
      othersHours,
      nonFaceToFaceHours,
      independentLearningHours,
      totalSLTHours,
      selectedClos,
      selectedKnows,
      selectedAtts,
      selectedSkills
    );

    setHeading('');
    setDescription('');

    setLectureHours('');
    setExerciseHours('');
    setPracticalHours('');
    setOthersHours('');
    setNonFaceToFaceHours('');
    setIndependentLearningHours('');
    setTotalSLTHours('');
    setSelectedClos([]);
    setSelectedKnows([]);
    setSelectedAtts([]);
    setSelectedSkills([]);
  };

  const handleCheckboxChange = (cloId) => {
    setSelectedClos(prevSelectedClos => {
      if (prevSelectedClos.includes(cloId)) {
        return prevSelectedClos.filter(id => id !== cloId);
      } else {
        return [...prevSelectedClos, cloId];
      }
    });
  };

  const handleKnowledgeCheckboxChange = (knowledgeId) => {
    setSelectedKnows(prevSelectedKnows => {
      if (prevSelectedKnows.includes(knowledgeId)) {
        return prevSelectedKnows.filter(id => id !== knowledgeId);
      } else {
        return [...prevSelectedKnows, knowledgeId];
      }
    });
  };

  const handleAttCheckboxChange = (attId) => {
    setSelectedAtts(prevSelectedAtts => {
      if (prevSelectedAtts.includes(attId)) {
        return prevSelectedAtts.filter(id => id !== attId);
      } else {
        return [...prevSelectedAtts, attId];
      }
    });
  };

  const handleSkillCheckboxChange = (skillId) => {
    setSelectedSkills(prevSelectedSkills => {
      if (prevSelectedSkills.includes(skillId)) {
        return prevSelectedSkills.filter(id => id !== skillId);
      } else {
        return [...prevSelectedSkills, skillId];
      }
    });
  };

  return (
    <Container>
      <Row>
        <div>
          <form className='ObeForm' onSubmit={handleSubmit}>
            <label className='input-label'>Heading:</label>
            <input type="text" className="form-control form-input" placeholder="Enter Topic Heading" value={heading} onChange={(e) => (setHeading(e.target.value))} required />
            <label className='input-label'>Description:</label>
            <input type="text" className="form-control form-input" placeholder="Enter Topic Description" value={description} onChange={(e) => (setDescription(e.target.value))} required />

            <fieldset className="form-group">
              <legend className="col-form-label input-label">Included CLOs:</legend>
              <div className="checkbox-container d-flex">
                {clos.map((clo, index) => (
                  <div key={clo.id}>
                    <input
                      type="checkbox"
                      id={`cloCheck${index}`}
                      checked={selectedClos.includes(clo.id)}
                      onChange={() => handleCheckboxChange(clo.id)}
                    />
                    <label htmlFor={`cloCheck${index}`} className="p-2">
                      CLO {index + 1}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
            <legend className="col-form-label input-label">Included ILO:</legend>
            <fieldset className="form-group">
              <legend className="col-form-label input-label">Knowledge:</legend>
              <div className="checkbox-container d-flex">
                {knows.map((knowledge, index) => (
                  <div key={knowledge.id}>
                    <input
                      type="checkbox"
                      id={`knowledgeCheck${index}`}
                      checked={selectedKnows.includes(knowledge.id)}
                      onChange={() => handleKnowledgeCheckboxChange(knowledge.id)}
                    />
                    <label htmlFor={`knowledgeCheck${index}`} className="p-2">
                      a{index + 1}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset className="form-group">
              <legend className="col-form-label input-label">Attitudes:</legend>
              <div className="checkbox-container d-flex">
                {atts.map((att, index) => (
                  <div key={att.id}>
                    <input
                      type="checkbox"
                      id={`attCheck${index}`}
                      checked={selectedAtts.includes(att.id)}
                      onChange={() => handleAttCheckboxChange(att.id)}
                    />
                    <label htmlFor={`attCheck${index}`} className="p-2">
                      b{index + 1}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset className="form-group">
              <legend className="col-form-label input-label">Skills:</legend>
              <div className="checkbox-container d-flex">
                {skills.map((skill, index) => (
                  <div key={skill.id}>
                    <input
                      type="checkbox"
                      id={`skillCheck${index}`}
                      checked={selectedSkills.includes(skill.id)}
                      onChange={() => handleSkillCheckboxChange(skill.id)}
                    />
                    <label htmlFor={`skillCheck${index}`} className="p-2">
                      c{index + 1}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>

            

           
            <label className='input-label'>Lecture (Hours):</label>
            <input type="number" className="form-control form-input" placeholder="Write Here" value={lectureHours} onChange={(e) => (setLectureHours(e.target.value))} />
            <label htmlFor="inputEmail3" className='input-label'>Exercise (hours):</label>
            <input type="number" className="form-control form-input" placeholder="Write Here" value={exerciseHours} onChange={(e) => (setExerciseHours(e.target.value))} />
            <label htmlFor="inputEmail3" className='input-label'>Practical (Hours):</label>
            <input type="number" className="form-control form-input" placeholder="Write Here" value={practicalHours} onChange={(e) => (setPracticalHours(e.target.value))} />
            <label htmlFor="inputEmail3" className='input-label'>Others(hours):</label>
            <input type="number" className="form-control form-input" placeholder="Write Here" value={othersHours} onChange={(e) => (setOthersHours(e.target.value))} />
            <label htmlFor="inputEmail3" className='input-label'>Non Face to Face (Hours):</label>
            <input type="number" className="form-control form-input" placeholder="Write Here" value={nonFaceToFaceHours} onChange={(e) => (setNonFaceToFaceHours(e.target.value))} />

            <label htmlFor="inputEmail3" className='input-label'>Independent Learning (Hours):</label>
            <input type="number" className="form-control form-input" placeholder="Write Here" value={independentLearningHours} onChange={(e) => (setIndependentLearningHours(e.target.value))} />
            <label htmlFor="inputEmail3" className='input-label'>Total SLT (Hours):</label>
            <input type="number" className="form-control form-input" placeholder="Write Here" value={totalSLTHours} onChange={(e) => (setTotalSLTHours(e.target.value))} />
            <button type="submit" className="btn btn-success">Add</button>
          </form>
        </div>
      </Row>
    </Container>
  );
};

export default CourseContentOutline;
