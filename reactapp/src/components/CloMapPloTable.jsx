import React, {useState, useEffect, useContext} from 'react'
import logo from './logos/JU_logo2.png';
import {Link,useParams} from 'react-router-dom'
import axios from 'axios';
export const CloMapPloTable = () => {

  const { accessId, curriculumId, syllabusId, courseId } = useParams();
  const [clos, setClos] = useState([]);
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/clo/?upCourse=${courseId}`)
      .then((res) => {
        setClos(res.data)
      }).catch(() => {
        alert("Something went wrong");
      })
  }, [])

  const [plos, setPlos] = useState([]);
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/plo/?upSyllabus=${syllabusId}`)
      .then((res) => {
        setPlos(res.data)
      }).catch(() => {
        alert("Something went wrong");
      })
  }, [])

const [mappingCloAndPlo, setMappingCloAndPlo] = useState([]);
const [localMapping, setLocalMapping] = useState({});
const [savedMapping, setSavedMapping] = useState(true);

const isComplete = () => {
  const expectedSize = (clos.length) * (plos.length);
  const actualSize = Object.keys(localMapping).length;
  return actualSize === expectedSize;
};


useEffect(() => {
  axios.get(`http://127.0.0.1:8000/api/clomapplo/?upCourse=${courseId}`)
    .then((res) => {
      if (res.status === 200) {
        if (res.data.length > 0) {
          console.log('Fetched mapping data:', res.data);
          setMappingCloAndPlo(res.data);
        }
      } else {
        console.error("Failed to fetch data from the server");
      }
      
    })
    .catch((error) => {
      console.error('Error fetching mapping data:', error);
      alert("Something went wrong");
    });
}, []);

useEffect(() => {
  console.log('Updated mappingCloAndPlo:', mappingCloAndPlo);
  
  const newLocalMapping = {};
  mappingCloAndPlo.forEach(temp => {
    newLocalMapping[`${temp.clo}-${temp.plo}`] = temp.correlation_level;
  });

  console.log('Updated localMapping:', newLocalMapping);
  setLocalMapping(newLocalMapping);
}, [mappingCloAndPlo]);


const handleMappingChange = (cloIndex, ploIndex, value) => {
  setSavedMapping(false);
  setLocalMapping(localMapping => ({
      ...localMapping,
      [`${cloIndex}-${ploIndex}`]: value,
  }));
};

const handleSave = async () => {
  console.log(localMapping);
  for (const key in localMapping) {
    const [cloIndex, ploIndex] = key.split('-');
    const correlationData = {
      upCourse : courseId,
      clo: parseInt(cloIndex, 10),
      plo: parseInt(ploIndex, 10),
      correlation_level: parseInt(localMapping[key], 10),
    };
    let flag = false;

    console.log(correlationData);
    
    for (const temp of mappingCloAndPlo) {
      console.log('Checking:', temp);
      if (correlationData.clo === temp.clo && correlationData.plo === temp.plo) {
        console.log('Matching!');
        try {
          await axios.put(`http://127.0.0.1:8000/api/clomapplo/${temp.id}/`, correlationData);
          console.log('Edit successful');
        } catch (error) {
          console.error('Error while updating correlations:', error);
          // Handle error
        }
        flag = true;
        break;
      }
    }

    if (!flag) {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/clomapplo/", correlationData);
        console.log('Create successful:', response);
      } catch (error) {
        console.error('Error while saving correlations:', error);
        // Handle error
      }
    }
  }
  setSavedMapping(true);
};



  return (
    <div className='Wrapper' id='clomapplo'>
        <div className='row'>
          <div className='col-4 Heading1'>
            {/* <p>Curriculum: {upCurriculums.starting} - {upCurriculums.ending}</p>
            <p>Program: {upSyllabuses.program} {upSyllabuses.selectedOption} {upSyllabuses.yearValue} {upSyllabuses.semesterValue} {upSyllabuses.session}</p>
            <p>Course: {upCourses.code}</p> */}
          </div>
          <div className='col-4 Heading2'>
            <h2>Mapping of CLO and PLO</h2>
          </div>
          <div className='col-4 Heading3'>
            <img src={logo} alt="Logo" />
          </div>
        </div>
        
        <table className='table table-bordered table-hover border-dark text-center align-middle'>
            <thead>
                
                <tr>
                    <th>CLOs</th>
                    <th>CLO Description</th>
                    {
                        plos.map((plo,index)=>(
                            <th>PLO{index+1}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>


            {
                clos.map((clo,cloIndex)=>(
                    <tr>
                        <td>CLO{cloIndex+1}</td>
                        <td>{clo.descriptionCLO}</td>
                        {
                            plos.map((plo,ploIndex)=>(
                                <td>
                                  {accessId === '0' &&
                                  <select
                                    name="mapping"
                                    id="mapping"
                                    className='form-select'
                                    value={localMapping[`${clo.id}-${plo.id}`] || ''}
                                    onChange={(e) => handleMappingChange(clo.id, plo.id, e.target.value)}
                                  >
                                    <option value="">select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                  </select>
                                  }
                                  {accessId === '1' &&
                                    localMapping[`${clo.id}-${plo.id}`]
                                  }
                                </td>
                            ))
                        }
                    </tr>
                ))
            }
                <tr>
                    <td colSpan={plos.length+2} className='text-center'>Level of Correlation: 3-High, 2-Medium, 1-Low</td>
                </tr>
            </tbody>
        </table>
        {accessId === '0' &&
        <button type='button' className='btn btn-success mb-5' onClick={handleSave}>Save</button>
        }
        <div className='row'>
            <div className='col-6 text-start'>
              <Link to={`/clo/${accessId}/${curriculumId}/${syllabusId}/${courseId}`}>
                <button type='submit' className='btn btn-warning'>Back</button>
              </Link>
              
            </div>
            <div className='col-6 text-end'>
            <Link
                to={(isComplete() && savedMapping) ? `/ilo/${accessId}/${curriculumId}/${syllabusId}/${courseId}` : '#'}
                onClick={(e) => {
                    if (!isComplete()) {
                      e.preventDefault();
                      alert("Please select values for all fields before proceeding.");
                    }
                    else if(!savedMapping)
                    {
                      e.preventDefault();
                      alert("Please save changes");
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
