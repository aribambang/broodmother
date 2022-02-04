import React, { useState, useEffect, useContext } from 'react';
import { SyncOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context';

const StripeSuccess = () => {
  const navigate = useNavigate();
  const [state, setState] = useContext(UserContext);

  useEffect(() => {
    if (state && state.token) getSubscriptionStatus();
  }, [state && state.token]);

  const getSubscriptionStatus = async () => {
    try {
      const { data } = await axios.get('/subscription-status');
      if (data && data.length === 0) {
        navigate('/');
      } else {
        const auth = JSON.parse(localStorage.getItem('auth'));
        auth.data = data;
        await localStorage.setItem('auth', JSON.stringify(auth));
        setState(auth);

        setTimeout(() => {
          navigate('/account');
        }, 1000);
      }
    } catch (err) {}
  };

  return (
    <div className='d-flex justify-content-center fw-bold' style={{ height: '90vh' }}>
      <div className='d-flex align-items-center'>
        <SyncOutlined spin style={{ fontSize: '50px' }} />
      </div>
    </div>
  );
};

export default StripeSuccess;
