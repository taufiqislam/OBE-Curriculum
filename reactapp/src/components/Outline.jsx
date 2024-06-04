import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import {faTrash} from '@fortawesome/free-solid-svg-icons'

export const Outline = ({ description, allClos, allKnows,allAtts,allSkills ,selectedCLOs, selectedKnows,selectedAtts,selectedSkills ,index,deleteoutline,editOutline, accessId }) => {
  const getCLOIndex = (cloId) => {
    console.log(allClos)
    const index = allClos.findIndex(clo => clo.id === cloId);
    return index !== -1 ? index + 1 : null;
  };
  const getKnowIndex = (knowId) => {
    const index = allKnows.findIndex(know => know.id === knowId);
    return index !== -1 ? index + 1 : null;
  };
  const getAttIndex = (attId) => {
    const index = allAtts.findIndex(att => att.id === attId);
    return index !== -1 ? index + 1 : null;
  };
  const getSkillIndex = (skillId) => {
    const index = allSkills.findIndex(skill => skill.id === skillId);
    return index !== -1 ? index + 1 : null;
  };
  
  console.log(description)
  return (
    <>
      
      <tr>
        <td >{index + 1}</td>
        <td colSpan={12} className='text-start'>
          <div className='fw-bold'>{description.heading}:</div>
          <div>{description.description}</div>
        </td>
        <td colSpan={4}>{selectedCLOs.map((cloId, i) => (
          <span key={i}> CLO {getCLOIndex(cloId)}</span>
        ))}</td>
        <td  colSpan={4}>
        { selectedKnows.length > 0 && selectedKnows.map((knowId, i) => (
    <span key={i}> a{getKnowIndex(knowId)}</span>
  ))}  
  { selectedAtts.length > 0 && selectedAtts.map((attId, i) => (
    <span key={i}> b{getAttIndex(attId)}</span>
  ))}  
  { selectedSkills.length > 0 && selectedSkills.map((skillId, i) => (
    <span key={i}> c{getSkillIndex(skillId)}</span>
  ))}
        </td>
       
        <td >{description.lecture}</td>
        <td >{description.exercise}</td>
        <td > {description.practical}</td>
        <td  >{description.others}</td>
        <td  colSpan={2}>{description.nonfaceToface}</td>
        <td colSpan={4} >{description.ilearn}</td>
        <td colSpan={2} >{description.totalSlt}</td>
        {accessId === '0' &&
        <td>
          <FontAwesomeIcon icon={faTrash} onClick={() => deleteoutline(description.id)}/> 
          <FontAwesomeIcon icon={faPenToSquare} onClick={() => editOutline(description.id)}/>
        </td>
        }
        
      </tr>
    </>
  );
};

export default Outline;