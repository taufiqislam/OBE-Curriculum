import React, { useContext } from 'react';
import { MissionForm } from './MissionForm';
import { Mission } from './Mission';
import { EditMissionForm } from './EditMissionForm';
import logo from './logos/JU_logo2.png';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

export const MissionWrapper = () => {
  const { accessId } = useParams();
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/mission/")
      .then((res) => {
        setMissions(res.data);
      }).catch(() => {
        alert("Something went wrong");
      });
  }, []);

  const addMission = mission => {
    const requestData = { description: mission, isEditing: false };

    axios
      .post('http://127.0.0.1:8000/api/mission/', requestData)
      .then((response) => {
        console.log(response.data);
        setMissions(prevMissions => [...prevMissions, response.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteMission = (id) => {
    axios.delete(`http://127.0.0.1:8000/api/mission/${id}/`)
      .then(() => {
        const newMission = missions.filter(t => t.id !== id);
        setMissions(newMission);
      }).catch(() => {
        alert("Something went wrong");
      });
  };

  const editMission = id => {
    setMissions(missions.map(mission => mission.id === id ? { ...mission, isEditing: !mission.isEditing } : mission));
  };

  const editDescriptionMission = (description, id) => {
    const requestData = { description: description };

    axios
      .put(`http://127.0.0.1:8000/api/mission/${id}/`, requestData)
      .then((response) => {
        setMissions(prevMissions => prevMissions.map(mission => mission.id === id ? { ...mission, description, isEditing: !mission.isEditing } : mission));
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isComplete = () => {
    return missions.length !== 0 ? 1 : 0;
  };

  return (
    <div className='Wrapper' id='mission'>
      <div className='row'>
        <div className='col-4 Heading1'></div>
        <div className='col-4 Heading2'>
          <h2>Mission</h2>
        </div>
        <div className='col-4 Heading3'>
          <img src={logo} alt="Logo" />
        </div>
      </div>

      {accessId === '0' && <MissionForm addMission={addMission} />}

      <table className='table table-bordered text-center table-hover border-dark'>
        <thead>
          <tr>
            <th>Mission ID</th>
            <th>Mission Description</th>
            {accessId === '0' && <th></th>}
          </tr>
        </thead>
        <tbody>
          {
            missions && (
              missions.map((mission, index) => (
                mission.isEditing ? (
                  <EditMissionForm key={mission.id} editMission={editDescriptionMission} description={mission} />
                ) : (
                  <Mission description={mission} key={mission.id} index={index} deleteMission={deleteMission} editMission={editMission} accessId={accessId} />
                )
              ))
            )
          }
        </tbody>
      </table>

      <div className='row'>
        <div className='col-6 text-start'>
          <Link to='/'>
            <button type='submit' className='btn btn-warning'>Back</button>
          </Link>
        </div>
        <div className='col-6 text-end'>
          <Link
            to={isComplete() ? `/vision/${accessId}` : '#'}
            onClick={(e) => {
              if (!isComplete()) {
                e.preventDefault();
                alert("Please add at least one Mission.");
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
  );
};

export default MissionWrapper;
