import React, {useContext, useState, useEffect} from 'react'
import logo from './logos/JU_logo2.png';
import {Link,useParams} from 'react-router-dom'
import axios from 'axios';


export const PeoMapMissionTable = () => {
  const {accessId ,curriculumId, syllabusId} = useParams();
  const [missions, setMissions] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/mission/")
      .then((res) => {
        setMissions(res.data)
      }).catch(() => {
        alert("Something went wrong");
      })
  }, [])

    const [peos, setPeos] = useState([]);
    useEffect(() => {
      axios.get(`http://127.0.0.1:8000/api/peo/?upSyllabus=${syllabusId}`)
        .then((res) => {
          setPeos(res.data)
        }).catch(() => {
          alert("Something went wrong");
        })
    }, [])
const [mappingPeoAndMission, setMappingPeoAndMission] = useState([]);
const [localMapping, setLocalMapping] = useState({});
const [savedMapping, setSavedMapping] = useState(true);

useEffect(() => {
  axios.get(`http://127.0.0.1:8000/api/mappings/?upSyllabus=${syllabusId}`)
    .then((res) => {
      if (res.status === 200) {
        if (res.data.length > 0) {
          console.log('Fetched mapping data:', res.data);
          setMappingPeoAndMission(res.data);
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
  console.log('Updated mappingPeoAndMission:', mappingPeoAndMission);
  
  const newLocalMapping = {};
  mappingPeoAndMission.forEach(temp => {
    newLocalMapping[`${temp.peo}-${temp.mission}`] = temp.correlation_level;
  });

  console.log('Updated localMapping:', newLocalMapping);
  setLocalMapping(newLocalMapping);
}, [mappingPeoAndMission]);

const isComplete = () => {
  const expectedSize = (peos.length) * (missions.length);
  const actualSize = Object.keys(localMapping).length;
  return actualSize === expectedSize;
};


const handleMappingChange = (peoIndex, missionIndex, value) => {
  setSavedMapping(false);
  setLocalMapping(localMapping => ({
      ...localMapping,
      [`${peoIndex}-${missionIndex}`]: value,
  }));
};

const handleSave = async () => {
  console.log(localMapping);
  for (const key in localMapping) {
    const [peoIndex, missionIndex] = key.split('-');
    const correlationData = {
      upSyllabus: syllabusId,
      peo: parseInt(peoIndex, 10),
      mission: parseInt(missionIndex, 10),
      correlation_level: parseInt(localMapping[key], 10),
    };
    let flag = false;

    console.log(correlationData);
    
    for (const temp of mappingPeoAndMission) {
      console.log('Checking:', temp);
      if (correlationData.peo === temp.peo && correlationData.mission === temp.mission) {
        console.log('Matching!');
        try {
          await axios.put(`http://127.0.0.1:8000/api/mappings/${temp.id}/`, correlationData);
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
        const response = await axios.post("http://127.0.0.1:8000/api/mappings/", correlationData);
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
    <div className='Wrapper' id='peomapmission'>
        <div className='row'>
          <div className='col-4 Heading1'>
          {/* <p>Curriculum: {upCurriculums.starting} - {upCurriculums.ending}</p>
          <p>Program: {upSyllabuses.program} {upSyllabuses.selectedOption} {upSyllabuses.yearValue} {upSyllabuses.semesterValue} {upSyllabuses.session}</p> */}
          </div>
          <div className='col-4 Heading2'>
            <h2>Mapping of PEO and Mission</h2>
          </div>
          <div className='col-4 Heading3'>
            <img src={logo} alt="Logo" />
          </div>
        </div>
        
        <table className='table table-bordered table-hover border-dark text-center align-middle'>
            <thead>
                <tr>
                    <th>PEOs</th>
                    <th>PEO Description</th>
                    {
                        missions.map((mission,index)=>(
                            <th>M{index+1}</th>
                        ))
                    }
                </tr>
            </thead>
            <tbody>


            {
                peos.map((peo,peoIndex)=>(
                    <tr>
                        <td>PEO{peoIndex+1}</td>
                        <td>{peo.descriptionPEO}</td>
                        {
                          missions.map((mission,missionIndex)=>(
                              <td>
                                {accessId === '0' &&
                                  <select
                                    name="mapping"
                                    id="mapping"
                                    className='form-select'
                                    value={localMapping[`${peo.id}-${mission.id}`] || ''}
                                    onChange={(e) => handleMappingChange(peo.id, mission.id, e.target.value)}
                                  >
                                    <option value="">select</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                  </select>
                                }
                                {accessId === '1' &&
                                  localMapping[`${peo.id}-${mission.id}`]
                                } 
                              </td>
                          ))
                        }
                    </tr>
                ))
            }
                <tr>
                    <td colSpan={missions.length+2} className='text-center'>Level of Correlation: 3-High, 2-Medium, 1-Low</td>
                </tr>
            </tbody>
        </table>
        {accessId === '0' &&
          <button type='button' className='btn btn-success mb-5' onClick={handleSave}>Save</button>
        }
        <div className='row'>
            <div className='col-6 text-start'>
              <Link to={`/peo/${accessId}/${curriculumId}/${syllabusId}`}>
                <button type='submit' className='btn btn-warning'>Back</button>
              </Link>
              
            </div>
            <div className='col-6 text-end'>
            <Link
                to={(isComplete() && savedMapping) ? `/plo/${accessId}/${curriculumId}/${syllabusId}` : '#'}
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
