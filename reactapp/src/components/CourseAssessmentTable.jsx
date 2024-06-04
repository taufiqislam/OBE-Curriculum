import logo from './logos/JU_logo2.png';
import React, {useState,useEffect,useContext} from 'react'
import {Link,useParams} from 'react-router-dom'
import axios from 'axios'

const CourseAssessmentTable = () => {

  const { accessId, curriculumId, syllabusId, courseId } = useParams();
  const [courseAssess, setCourseAssess] = useState({});
  const [rem_fest, setRem_fest] = useState("");
  const [rem_assign,setRem_assign]=useState("")
  const [rem_exper,setRem_exper]=useState("")
  const [rem_final,setRem_final]=useState("")
  const [un_fest,setUn_fest]=useState("")
  const [un_assign,setUn_assign]=useState("")
  const [un_exper,setUn_exper]=useState("")
  const [un_final,setUn_final]=useState("")
  const [apply_fest,setApply_fest]=useState("")

  const [apply_assign,setApply_assign]=useState("")
  const [apply_exper,setApply_exper]=useState("")
  const [apply_final,setApply_final]=useState("")
  const [analyze_fest,setAnalyze_fest]=useState("")

  const [analyze_assign,setAnalyze_assign]=useState("")
  const [analyze_exper,setAnalyze_exper]=useState("")
  const [analyze_final,setAnalyze_final]=useState("")
  const [eva_fest,setEva_fest]=useState("")
  const [eva_assign,setEva_assign]=useState("")
  const [eva_exper,setEva_exper]=useState("")
  const [eva_final,setEva_final]=useState("")
  const [c_fest,setC_fest]=useState("")
  const [ c_assign,setC_assign]=useState("")
  const [c_exper,setC_exper]=useState("")
  const [ c_final,setC_final]=useState("")
  const [final, setFinal] = useState(0);
  const [final1, setFinal1] = useState(0);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
     // Calculate the sum
     const sum = parseInt(rem_fest) + parseInt(rem_assign) + parseInt(rem_exper) + parseInt(un_fest) + parseInt(un_assign) + parseInt(un_exper) + parseInt(apply_fest) + parseInt(apply_assign) + parseInt(apply_exper) + parseInt(analyze_fest) + parseInt(analyze_assign) + parseInt(analyze_exper) + parseInt(eva_fest) + parseInt(eva_assign) + parseInt(eva_exper) + parseInt(c_fest) + parseInt(c_assign) + parseInt(c_exper);
 
     // Update the final state
     setFinal(sum);
 
     // Calculate the sum1
     const sum1 = parseInt(rem_final) + parseInt(apply_final) + parseInt(analyze_final) + parseInt(eva_final) + parseInt(c_final) + parseInt(un_final) ;
 
     // Update the final1 state
     setFinal1(sum1);
   }, [rem_fest, rem_assign, rem_exper, un_fest, un_assign, un_exper, apply_fest, apply_assign, apply_exper, analyze_fest, analyze_assign, analyze_exper, eva_fest, eva_assign, eva_exper, c_fest, c_assign, c_exper, rem_final, apply_final, analyze_final, eva_final, c_final, un_final]);

  useEffect(() => {
     axios.get(`http://127.0.0.1:8000/api/assess/?upCourse=${courseId}`)
       .then((response) => {
         if (response.status === 200) {
           if (response.data.length > 0) {
             setCourseAssess(response.data[0]);
             const data = response.data[0];
               setRem_fest(data.rem_fest);
               setRem_assign(data.rem_assign);
               setRem_exper(data.rem_exper);
               setRem_final(data.rem_final);
               setUn_fest(data.un_fest);
               setUn_assign(data.un_assign);
               setUn_exper(data.un_exper);
               setUn_final(data.un_final);
               setApply_fest(data.apply_fest);
               setApply_assign(data.apply_assign);
               setApply_exper(data.apply_exper);
               setApply_final(data.apply_final);
               setAnalyze_fest(data.analyze_fest);
               setAnalyze_assign(data.analyze_assign);
               setAnalyze_exper(data.analyze_exper);
               setAnalyze_final(data.analyze_final);
               setEva_fest(data.eva_fest);
               setEva_assign(data.eva_assign);
               setEva_exper(data.eva_exper);
               setEva_final(data.eva_final);
               setC_fest(data.c_fest);
               setC_assign(data.c_assign);
               setC_exper(data.c_exper);
               setC_final(data.c_final);
               setIsUpdating(true); // Set the flag to indicate updating existing data
           }
         } else {
           console.error("Failed to fetch data from the server");
         }
       })
       .catch(() => {
         console.error("Something went wrong");
       });
   }, []);

   

  const handleSubmit = async (e) => {

    const requestData = {
     upCourse : courseId,
     rem_fest: rem_fest,
     rem_assign: rem_assign,
     rem_exper: rem_exper,
     rem_final: rem_final,
     un_fest: un_fest,
     un_assign: un_assign,
     un_exper: un_exper,
     un_final: un_final,
     apply_fest: apply_fest,
     apply_assign: apply_assign,
     apply_exper:  apply_exper,
     apply_final: apply_final,
     analyze_final: analyze_final,
     analyze_fest: analyze_fest,
     analyze_assign: analyze_assign,
     analyze_exper:  analyze_exper,
     eva_fest: eva_fest,
     eva_assign:eva_assign,
     eva_exper: eva_exper,
     eva_final: eva_final,
     c_fest: c_fest,
     c_assign: c_assign,
     c_exper: c_exper,
     c_final: c_final,
     isEditing: false
    };
    e.preventDefault();

    try {
      if (isUpdating) {

        const response = await axios.put(`http://127.0.0.1:8000/api/assess/${courseAssess.id}/`, requestData);
        console.log('Update Response:', response.data);
      } else {

        const response = await axios.post('http://127.0.0.1:8000/api/assess/', requestData);
        console.log('Create Response:', response.data);
        setIsUpdating(true); 
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
    };
    
 
  
  return (
    <div className='Wrapper' id='courseassessment'>
          <div className='row'>
               <div className='col-4 Heading1'>
                    {/* <p>Curriculum: {upCurriculums.starting} - {upCurriculums.ending}</p>
                    <p>Program: {upSyllabuses.program} {upSyllabuses.selectedOption} {upSyllabuses.yearValue} {upSyllabuses.semesterValue} {upSyllabuses.session}</p>
                    <p>Course: {upCourses.code}</p> */}
               </div>
               <div className='col-4 Heading2'>
                    <h2>Course Assessment</h2>
               </div>
               <div className='col-4 Heading3'>
                    <img src={logo} alt="Logo" />
               </div>
          </div>
          <form action="submit" className='CourseInfoForm container-fluid' onSubmit={handleSubmit}>
       <table className='table table-bordered text-center table-hover border-dark'>
            <thead>
                <tr>
                    <th rowSpan={2}>Blooms Category</th>
                    <th colSpan={3}>CIE - Continuous Internal Evaluation</th>
                    <th rowSpan={2}>Final Examination</th>
                </tr>
                <tr >
                     
                    <th>Fest/Quiz</th>
                    <th>Assignment</th>
                    <th>External Perticipation</th>
                </tr>
                    
            </thead>
            <tbody>

                <tr >
                     <th >Remember</th>
                
                     <td><input required name="rem_fest" type="number"  value={rem_fest} onChange={(e) => setRem_fest(e.target.value)} className=' form-input form-control' readOnly={accessId === '1'}/></td>
                     <td><input required name="rem_assign" type="number" value={rem_assign} onChange={(e) => setRem_assign(e.target.value)} className='form-input form-control' readOnly={accessId === '1'}/></td>
                     <td><input required name="rem_exper" type="number"  value={rem_exper} onChange={(e) => setRem_exper(e.target.value)} className='form-input form-control' readOnly={accessId === '1'}/></td>
                     <td><input required name="rem_final" type="number" value={rem_final} onChange={(e) => setRem_final(e.target.value)} className='form-input form-control' readOnly={accessId === '1'}/></td>
                </tr>
                <tr >
                     <th >Understand</th>
                
                     <td><input required name="un_fest"  value={un_fest} onChange={(e) => setUn_fest(e.target.value)} type="number" className='form-input form-control' readOnly={accessId === '1'}/></td>
                     <td><input required name="un_assign" value={un_assign} onChange={(e) => setUn_assign(e.target.value)} type="number" className='form-input form-control' readOnly={accessId === '1'}/></td>
                     <td><input required name="un_exper" value={un_exper} onChange={(e) => setUn_exper(e.target.value)} type="number" className='form-input form-control' readOnly={accessId === '1'}/></td>
                     <td><input required name="un_final" value={un_final} onChange={(e) => setUn_final(e.target.value)} type="number" className='form-input form-control' readOnly={accessId === '1'}/></td>
                </tr>
                <tr >
                     <th >Apply</th>
                
                     <td><input required name="apply_fest" type="number" value={apply_fest} onChange={(e) => setApply_fest(e.target.value)} className='form-input form-control' readOnly={accessId === '1'}/></td>
                     <td><input required name="apply_assign" type="number" value={apply_assign} onChange={(e) => setApply_assign(e.target.value)} className='form-input form-control' readOnly={accessId === '1'}/></td>
                     <td><input required name="apply_exper" value={apply_exper} onChange={(e) => setApply_exper(e.target.value)} type="number" className='form-input form-control' readOnly={accessId === '1'}/></td>
                     <td><input required name="apply_final" value={apply_final} onChange={(e) => setApply_final(e.target.value)} type="number" className='form-input form-control' readOnly={accessId === '1'}/></td>
                </tr>
                <tr >
                     <th >Analyze</th>
                
                     <td><input required name="analyze_fest" type="number"  value={analyze_fest} onChange={(e) => setAnalyze_fest(e.target.value)} className='form-input form-control' readOnly={accessId === '1'}/></td>
                     <td><input required name="analyze_assign" type="number" value={analyze_assign} onChange={(e) => setAnalyze_assign(e.target.value)} className='form-input form-control' readOnly={accessId === '1'}/></td>
                     <td><input required name="analyze_exper" type="number" value={analyze_exper} onChange={(e) => setAnalyze_exper(e.target.value)} className='form-input form-control' readOnly={accessId === '1'}/></td>
                     <td><input required name="analyze_final" type="number"  value={analyze_final} onChange={(e) => setAnalyze_final(e.target.value)} className='form-input form-control' readOnly={accessId === '1'}/></td>
                </tr>
                <tr >
                     <th >Evaluate</th>
                
                     <td><input required name="eva_fest" type="number" value={eva_fest} onChange={(e) => setEva_fest(e.target.value)} className='form-input form-control' readOnly={accessId === '1'}/></td>
                     <td><input required name="eva_assign" type="number" value={eva_assign} onChange={(e) => setEva_assign(e.target.value)} className='form-input form-control' readOnly={accessId === '1'}/></td>
                     <td><input required name="eva_exper" type="number"   value={eva_exper} onChange={(e) => setEva_exper(e.target.value)} className='form-input form-control' readOnly={accessId === '1'}/></td>
                     <td><input required name="eva_final" type="number" value={eva_final} onChange={(e) => setEva_final(e.target.value)} className='form-input form-control' readOnly={accessId === '1'}/></td>
                </tr>
                <tr >
                     <th >Create</th>
                 
                     <td><input required name="c_fest" type="number"  value={c_fest} onChange={(e) => setC_fest(e.target.value)} className='form-input form-control' readOnly={accessId === '1'}/></td>
                     <td><input required name="c_assign" type="number" value={c_assign} onChange={(e) => setC_assign(e.target.value)} className='form-input form-control' readOnly={accessId === '1'}/></td>
                     <td><input required name="c_exper" type="number" value={c_exper} onChange={(e) => setC_exper(e.target.value)} className='form-input form-control' readOnly={accessId === '1'}/></td>
                     <td><input required name="c_final" type="number" value={c_final} onChange={(e) => setC_final(e.target.value)} className='form-input form-control' readOnly={accessId === '1'}/></td>
                </tr>
                <tr >
                     <th >Total</th>
                
                     <td colSpan={3}><input type="number" className='form-input form-control' value={final} readOnly /></td>
                     <td><input name="final" type="number"  className='form-input form-control' value={final1} readOnly /></td>
                </tr>

            
            </tbody>
        </table>
        {accessId === '0' &&
          <button type='submit' className='btn btn-success mb-5' >Save</button>
        }
        </form>
        <div className='row'>
            <div className='col-6 text-start'>
              <Link to = {`/outline/${accessId}/${curriculumId}/${syllabusId}/${courseId}`}>
                <button type='submit' className='btn btn-warning'>Back</button>
              </Link>
              
            </div>
            <div className='col-6 text-end'>
              <Link to={`/bookreference/${accessId}/${curriculumId}/${syllabusId}/${courseId}`}>
                <button type='submit' className='form-btn btn'>Next</button>
              </Link>
              
            </div>
        </div>
    </div>
  )
}

export default CourseAssessmentTable