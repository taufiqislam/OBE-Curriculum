import React from 'react'
import { MissionWrapper } from '../components/MissionWrapper'
import { useState,useEffect } from 'react';
import axios from 'axios';
export const MissionPage = () => {
  return (
    <div className='container-fluid g-0 Page'>
      <MissionWrapper/>
    </div>
  )
}
