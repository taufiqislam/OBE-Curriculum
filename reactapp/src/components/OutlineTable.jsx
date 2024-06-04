import React, { useState, useEffect, useContext,useMemo } from 'react';
import { Container } from 'react-bootstrap';
import logo from './logos/JU_logo2.png';
import CourseContentOutline from "./CourseContentOutline";
import { Outline } from './Outline';
import {useParams,Link} from 'react-router-dom';
import axios from 'axios';
import EditOutline from './EditOutline';

const OutlineTable = () => {

  
  const { accessId, curriculumId, syllabusId, courseId } = useParams();
  const [outlinelast, setoutlinelast] = useState({});
  const [outlines, setOutlines] = useState([]);
  const [allClos, setAllClos] = useState([]);
  const [allKnows, setAllKnows] = useState([]);
  const [allAtts, setAllAtts] = useState([]);
  const [allSkills, setAllSkills] = useState([]);
  const [sumL, setSumL] = useState(0);
  const [sumE, setSumE] = useState(0);
  const [sumN2F, setSumN2F] = useState(0);
  const [sumSTL, setSumSTL] = useState(0);
  const [attendanceP, setattendanceP] = useState(0);
  const [tutP,settutP]=useState(0)
  const [finalP,setfinalP]=useState(0)
  const [tutF2F,settutF2F]=useState(0)
  const [finalF2F,setFinalF2f]=useState(0)
  const [tutnF2F,settutnF2F]=useState(0)
  const [finalnF2F,setfinalnF2F]=useState(0)
  const [tutStl,settutStl]=useState(0)
  const [finalstl,setfinalstl]=useState(0)
  const [isUpdating, setIsUpdating] = useState(false);


  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/outline/?upCourse=${courseId}`)
      .then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          setOutlines(res.data);
        } else {
          console.error("Failed to fetch outline data from the server");
        }
      })
      .catch(() => {
        console.error("Something went wrong while fetching outline data");
      });

    axios.get(`http://127.0.0.1:8000/api/clo/?upCourse=${courseId}`)
      .then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          setAllClos(res.data);
        } else {
          console.error("Failed to fetch CLO data from the server");
        }
      })
      .catch(() => {
        console.error("Something went wrong while fetching CLO data");
      });

    axios.get(`http://127.0.0.1:8000/api/knowledge/?upCourse=${courseId}`)
      .then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          setAllKnows(res.data);
        } else {
          console.error("Failed to fetch Knowledge data from the server");
        }
      })
      .catch(() => {
        console.error("Something went wrong while fetching Knowledge data");
      });

    axios.get(`http://127.0.0.1:8000/api/attitude/?upCourse=${courseId}`)
      .then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          setAllAtts(res.data);
        } else {
          console.error("Failed to fetch Attitude data from the server");
        }
      })
      .catch(() => {
        console.error("Something went wrong while fetching Attitude data");
      });

    axios.get(`http://127.0.0.1:8000/api/skill/?upCourse=${courseId}`)
      .then((res) => {
        if (res.status === 200 && res.data.length > 0) {
          setAllSkills(res.data);
        } else {
          console.error("Failed to fetch Skill data from the server");
        }
      })
      .catch(() => {
        console.error("Something went wrong while fetching Skill data");
      });
  }, []);
  const deleteoutline = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/outline/${id}/`)
        .then(() => {
            const newoutline = outlines.filter(t => {
                return t.id !== id
            });
            setOutlines(newoutline);
        }).catch(() => {
            alert("Something went wrong");
        })
}
  useEffect(() => {
    const lSum = outlines.reduce((acc, curr) => acc + curr.lecture, 0);
    const eSum = outlines.reduce((acc, curr) => acc + curr.exercise, 0);
    const n2fSum = outlines.reduce((acc, curr) => acc + curr.nonfaceToface, 0);
    const stlSum = outlines.reduce((acc, curr) => acc + curr.totalSlt, 0);
    setSumL(lSum);
    setSumE(eSum);
    setSumN2F(n2fSum);
    setSumSTL(stlSum);
  }, [outlines]);

  useEffect(() => {
    const fetchOutlineLast = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/outlinelast/?upCourse=${courseId}`);
        if (response.status === 200 && response.data.length > 0) {
          const data = response.data[0];
          setoutlinelast(data);
          setattendanceP(data.attendanceP);
          settutP(data.tutP);
          setFinalF2f(data.finalF2F);
          settutF2F(data.tutF2F);
          settutStl(data.tutStl);
          setfinalP(data.finalP);
          settutnF2F(data.tutnF2F);
          setfinalnF2F(data.finalnF2F);
          setfinalstl(data.finalstl);
          setIsUpdating(true);
          
        }
      } catch (error) {
        console.error("Error fetching outline last data:", error);
      }
    };

    fetchOutlineLast();
  }, [courseId]);
  const handleSubmit1 = async (e) => {
    e.preventDefault();
    const requestData = {
      upCourse : courseId,
      attendanceP,
      tutP,
      tutF2F,
      tutnF2F,
      tutStl,
      finalP,
      finalF2F,
      finalnF2F,
      finalstl,
      isEditing: false,
    };

    try {
      if (isUpdating) {
        const response = await axios.put(`http://127.0.0.1:8000/api/outlinelast/${outlinelast.id}/`, requestData);
        console.log('Update Response:', response.data);
      } else {
        const response = await axios.post('http://127.0.0.1:8000/api/outlinelast/', requestData);
        console.log('Create Response:', response.data);
        setIsUpdating(true);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const addOutline = (heading, description,  nonfaceToface, lecture, exercise, practical, others, ilearn, totalSlt, selectedCLOs, selectedKnows, selectedAtts, selectedSkills) => {
    const requestData = {
      upCourse : courseId,
      heading: heading,
      description: description,

      nonfaceToface: nonfaceToface,
      lecture: lecture,
      exercise: exercise,
      practical: practical,
      others: others,
      ilearn: ilearn,
      totalSlt: totalSlt,
    };

    axios.post('http://127.0.0.1:8000/api/outline/', requestData)
      .then((response) => {
        const outlineId = response.data.id;
        axios.post(`http://127.0.0.1:8000/api/outline/${outlineId}/clos/`, { clos: selectedCLOs })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.error("Error adding CLOs to Outline:", err);
          });

        axios.post(`http://127.0.0.1:8000/api/outline/${outlineId}/knows/`, { knows: selectedKnows })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.error("Error adding Knowledge to Outline:", err);
          });

        axios.post(`http://127.0.0.1:8000/api/outline/${outlineId}/atts/`, { atts: selectedAtts })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.error("Error adding Attitudes to Outline:", err);
          });

        axios.post(`http://127.0.0.1:8000/api/outline/${outlineId}/skills/`, { skills: selectedSkills })
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.error("Error adding Skills to Outline:", err);
          });
        response.data.clos = selectedCLOs
        response.data.knows = selectedKnows
        response.data.atts = selectedAtts
        response.data.skills = selectedSkills
        setOutlines(prevoutline => [...prevoutline, response.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const isComplete = () => {
    return outlines.length !== 0;
  };
  const editOutline = id => {
    setOutlines(outlines.map(outline => outline.id === id ? {...outline, isEditing: !outline.isEditing} : outline))
}
const updateOutline = (id, heading, description, nonfaceToface, lecture, exercise, practical, others, ilearn, totalSlt, selectedCLOs, selectedKnows, selectedAtts, selectedSkills) => {
  const requestData = {
    upCourse: courseId,
    heading: heading,
    description: description,
    nonfaceToface: nonfaceToface,
    lecture: lecture,
    exercise: exercise,
    practical: practical,
    others: others,
    ilearn: ilearn,
    totalSlt: totalSlt,
  };

  axios.put(`http://127.0.0.1:8000/api/outline/${id}/`, requestData)
    .then((response) => {
      const updatedOutline = response.data;

      axios.post(`http://127.0.0.1:8000/api/outline/${id}/clos/`, { clos: selectedCLOs })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error("Error updating CLOs for Outline:", err);
        });

      axios.post(`http://127.0.0.1:8000/api/outline/${id}/knows/`, { knows: selectedKnows })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error("Error updating Knowledge for Outline:", err);
        });

      axios.post(`http://127.0.0.1:8000/api/outline/${id}/atts/`, { atts: selectedAtts })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error("Error updating Attitudes for Outline:", err);
        });

      axios.post(`http://127.0.0.1:8000/api/outline/${id}/skills/`, { skills: selectedSkills })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error("Error updating Skills for Outline:", err);
        });
        response.data.clos = selectedCLOs;
        response.data.knows = selectedKnows;
        response.data.atts = selectedAtts;
        response.data.skills = selectedSkills;
      setOutlines(prevOutlines => prevOutlines.map(outline => outline.id === id ? updatedOutline : outline));
    })
    .catch((error) => {
      console.error("Error updating Outline:", error);
    });
}

  const sum = useMemo(() => tutStl + finalstl, [tutStl, finalstl]);
  
  return (
    
    <Container className="Wrapper">
        <div>
            <div className='row'>
                <div className='col-4 Heading1'>
                
                </div>
                <div className='col-4 Heading2'>
                <h2 >Course Content Outline</h2>
                </div>
                <div className='col-4 Heading3'>
                <img src={logo} alt="Logo" />
                </div>
            </div>
            {accessId === '0' &&
            <CourseContentOutline addOutline={addOutline}  />
            }
            <table  className='table table-bordered text-center border-dark table-hover bg-dark'  >
                <thead className="thead-dark">
                <tr>
                    <th rowSpan={5}>#</th>
                    <th colSpan={12} rowSpan={2}>Course Content Outline</th>
                    <th colSpan={4} rowSpan={5}>CLO</th>
                    <th colSpan={4} rowSpan={5}>ILO</th>
                    <th colSpan={12}>Teaching and Learning Activities</th>
                    {accessId === '0' &&
                      <th rowSpan={5}></th>
                    }
                    
                    

                </tr>
                <tr>
                    <th colSpan={6}>Guided Learning</th>
                    <th colSpan={4} rowSpan={4}>Independent Learning(NF2F)</th>
                    <th colSpan={2} rowSpan={4}>Total SLT</th>                    
                    
                </tr>

                <tr>
                    <th colSpan={4} rowSpan={2}>BMB 101</th>
                    <th colSpan={8} rowSpan={2}>Introductory Biochemistry</th>

                    <th colSpan={4} rowSpan={2}>F2F</th>
                    <th colSpan={2} rowSpan={2}>Non-F2F</th>
                    
                </tr>
                <tr>
                </tr>
                <tr>
                    <th colSpan={12}>Topic</th>
                    <th >L</th>
                    <th >E</th>
                    <th >P</th>
                    <th >O</th>
                    <th colSpan={2} >NF2F</th>
                    
                </tr>
                </thead>
                <tbody>
                
                {
                outlines.map((outline,index) => (
                
                outline.isEditing ? (<EditOutline editOutline={updateOutline} descriptionoutline={outline}/>
                ):
               // Inside the OutlineTable component where you render the Outline component
                  
                <Outline
                key={outline.id}
                description={outline}
                allClos={allClos}
                allKnows={allKnows}
                allAtts={allAtts}
                allSkills={allSkills}
                selectedCLOs={outline.clos}
                selectedKnows={outline.knows}
                selectedAtts={outline.atts}
                selectedSkills={outline.skills}
                index={index}
                umL={sumL} // Pass sumL as a prop
                sumE={sumE} // Pass sumE as a prop
                sumN2F={sumN2F} // Pass sumN2F as a prop
                sumSTL={sumSTL}
                deleteoutline={deleteoutline}
                editOutline={editOutline}
                accessId={accessId}                
                />

         

                ))
               

                }
                <tr>
                  <td colSpan={21}>Total</td>
                  <td>{sumL}</td>
                  <td>{sumE}</td>
                  <td></td>
                  <td></td>
                  <td>{sumN2F}</td>
                  <td colspan={5}></td>
                  <td colspan={3} >{sumSTL}</td>
                </tr>
            
                </tbody>

            </table>
        </div>
        <div>
        <form action="submit" className='CourseInfoForm container-fluid' onSubmit={handleSubmit1}>
          <table className='table table-bordered text-center table-hover border-dark'>
            <thead>
              <tr>
                <th>Assessment</th>
                <th>Percentage</th>
                <th>F2F</th>
                <th>NonF2F</th>
                <th>STL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Attendance</td>
                <td><input required name="attendanceP" type="number" value={attendanceP} onChange={(e) => setattendanceP(e.target.value)} className='form-input form-control' readOnly={accessId === '1'}/></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>Assignment/Tutorial</td>
                <td><input required name="tutP" value={tutP} onChange={(e) => settutP(e.target.value)} type="number" className='form-input form-control' readOnly={accessId === '1'}/></td>
                <td><input required name="tutF2F" value={tutF2F} onChange={(e) => settutF2F(e.target.value)} type="number" className='form-input form-control' readOnly={accessId === '1'}/></td>
                <td><input required name="tutnF2F" value={tutnF2F} onChange={(e) => settutnF2F(e.target.value)} type="number" className='form-input form-control' readOnly={accessId === '1'}/></td>
                <td><input required name="tutStl" value={tutStl} onChange={(e) => settutStl(parseInt(e.target.value))} type="number" className='form-input form-control' readOnly={accessId === '1'}/></td>
              </tr>
              <tr>
                <td>Final Exam</td>
                <td><input required name="finalP" type="number" value={finalP} onChange={(e) => setfinalP(e.target.value)} className='form-input form-control' readOnly={accessId === '1'}/></td>
                <td><input required name="finalF2F" type="number" value={finalF2F} onChange={(e) => setFinalF2f(e.target.value)} className='form-input form-control' readOnly={accessId === '1'}/></td>
                <td><input required name="finalnF2F" type="number" value={finalnF2F} onChange={(e) => setfinalnF2F(e.target.value)} className='form-input form-control' readOnly={accessId === '1'}/></td>
                <td><input required name="finalstl" type="number" value={finalstl} onChange={(e) => setfinalstl(parseInt(e.target.value))} className='form-input form-control' readOnly={accessId === '1'}/></td>
              </tr>
              <tr>
                <td colspan={3}></td>
                <td>Total STL</td>
                <td>{sum}</td>
              </tr>
            </tbody>
          </table>
          {accessId === '0' &&
            <button type='submit' className='btn btn-success mb-5'>Save</button>
          }
        </form>
      </div>
        <div className='row'>
            <div className='col-6 text-start'>
              <Link to={`/ilo/${accessId}/${curriculumId}/${syllabusId}/${courseId}`}>
                <button type='submit' className='btn btn-warning'>Back</button>
              </Link>
              
            </div>
            <div className='col-6 text-end'>
              <Link
                  to={isComplete() ? `/courseassessment/${accessId}/${curriculumId}/${syllabusId}/${courseId}` : '#'}
                  onClick={(e) => {
                      if (!isComplete()) {
                          e.preventDefault();
                          alert("Please add at least one PEO.");
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
    </Container>
  )
}

export default OutlineTable
