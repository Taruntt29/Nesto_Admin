import axios from "axios";
import { useSelector } from "react-redux";

const testToken = process.env.TOKEN;
const axiosInstance = axios.create({
  // baseURL: `http://nestobackend-env.eba-fk3zufmz.ap-south-1.elasticbeanstalkgit.com/api`,
  baseURL: `http://ec2-54-166-52-219.compute-1.amazonaws.com/api`,
  headers: {
    // 'Content-Type': 'application/json',
    "Content-Type": "multipart/form-data",
    // Authorization: `Bearer ${testToken}`,
    Authorization:
      "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwNjkwNTY1MzJmMjU2OTQ3OWZjOWQiLCJpYXQiOjE2Nzg3OTc1ODMsImV4cCI6MTY4NjU3MzU4M30.8QjZtAmk342PMxa0CvGdqfp36BWk6lJ4QFyN6f1MO_A",
  },
});

const axiosInstanceWithoutFormData = axios.create({
  // baseURL: `http://nestobackend-env.eba-fk3zufmz.ap-south-1.elasticbeanstalk.com/api`,
  baseURL: `http://ec2-54-166-52-219.compute-1.amazonaws.com/api`,
  headers: {
    // 'Content-Type': 'application/json',
    // 'Content-Type': 'multipart/form-data',
    // Authorization: `Bearer ${testToken}`,
    Authorization:
      "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwNjkwNTY1MzJmMjU2OTQ3OWZjOWQiLCJpYXQiOjE2Nzg3OTc1ODMsImV4cCI6MTY4NjU3MzU4M30.8QjZtAmk342PMxa0CvGdqfp36BWk6lJ4QFyN6f1MO_A",
  },
});

const setAuthToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.Authorization;
  }
};

const useAuth = () => {
  const token = useSelector((state) => state.auth.token) || [];

  if (token) {
    setAuthToken(token);
  }

  return { token };
};

export { axiosInstance, useAuth, setAuthToken, axiosInstanceWithoutFormData };
