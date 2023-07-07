import { useEffect } from 'react';
import { setToken } from '../store/authSlice';
import { setAuthToken } from '../services/api';
import { useDispatch } from 'react-redux';

const useToken = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const brokerID = localStorage.getItem('brokerID');
    if (token && brokerID) {
      dispatch(setToken(token));
      setAuthToken(token);
    }
  }, [dispatch]);
};

export default useToken;
