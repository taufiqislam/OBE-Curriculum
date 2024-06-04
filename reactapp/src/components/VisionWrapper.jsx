import React, {useState,useEffect} from 'react'
import { VisionForm } from './VisionForm'
import {v4 as uuidv4} from 'uuid'
import { Vision } from './Vision'
import { EditVisionForm } from './EditVisionForm';
import logo from './logos/JU_logo2.png';
import {Link, useParams} from 'react-router-dom'
import axios from 'axios';
uuidv4()

export const VisionWrapper = () => {
  const { accessId } = useParams();
    const [visions, setVisions] = useState([])

    useEffect(() => {
      axios.get("http://127.0.0.1:8000/api/vision/")
        .then((res) => {
          if (res.status === 200) {
            if (res.data.length > 0) {
              setVisions(res.data);
            }
          } else {
            console.error("Failed to fetch data from the server");
          }
        })
        .catch(() => {
          console.error("Something went wrong");
        });
    }, []);
    
     const addVision = visions => {
        const requestData = { description: visions, isEditing: false};
      
        axios
          .post('http://127.0.0.1:8000/api/vision/', requestData)
          .then((response) => {
            // Handle the response if needed
            console.log(response.data);
            setVisions(prevVisions => [...prevVisions, response.data]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      const deleteVision = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/vision/${id}/`)
            .then(() => {
                const newVision = visions.filter(t => {
                    return t.id !== id
                });
                setVisions(newVision);
            }).catch(() => {
                alert("Something went wrong");
            })
    }
    const editVision = id => {
      setVisions(visions.map(vision => vision.id === id ? {...vision, isEditing: !vision.isEditing} : vision))
  }
  const editDescription = (description, id) => {
      
      const requestData = { description: description };
  
      axios
        .put(`http://127.0.0.1:8000/api/vision/${id}/`, requestData)
        .then((response) => {
          // Handle the response if needed
          setVisions(prevVisions => prevVisions.map(vision => vision.id === id ? {...vision,description, isEditing: !vision.isEditing} : vision))
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);      
        });
  }
  const isComplete = () => {
    return visions.length !== 0;
  };  
  return (
    <div className='Wrapper' id='vision'>
        <div className='row'>
          <div className='col-4 Heading1'>

          </div>
          <div className='col-4 Heading2'>
            <h2 >Vision</h2>
          </div>
          <div className='col-4 Heading3'>
            <img src={logo} alt="Logo" />
          </div>
        </div>
        {addVision && (accessId === '0' && <VisionForm addVision={addVision}/>)}
        
        <table className='table table-bordered text-center border-dark'>
          <thead>
            <tr>
              <th>Vision ID</th>
              <th>Vision Description</th>
              {accessId === '0' && <th></th>}
            </tr>
          </thead>
          <tbody>
            {
           visions && (
            visions.map((vision, index) => (
              
              vision.isEditing ? (
                <EditVisionForm editVision={editDescription} description={vision}/>
              ) : (
                <Vision description={vision} key={vision.id} index={index} deleteVision={deleteVision} editVision={editVision} accessId={accessId}/>
                )))
           )
                
            }
          </tbody>
        </table>
        <div className='row'>
            <div className='col-6 text-start'>
              <Link to={`/mission/${accessId}`}>
                <button type='submit' className='btn btn-warning'>Back</button>
              </Link>
              
            </div>
            <div className='col-6 text-end'>
              <Link
                    to={isComplete() ? `/curriculum/${accessId}` : '#'}
                    onClick={(e) => {
                        if (!isComplete()) {
                            e.preventDefault();
                            alert("Please add at least one Vision.");
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
