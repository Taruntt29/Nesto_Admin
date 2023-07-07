import axios from 'axios';
// import { useSelector } from "react-redux";

const axiosInstance = axios.create({
  // baseURL: `https://apis.nestohub.in/api`,
  baseURL: `http://ec2-54-166-52-219.compute-1.amazonaws.com/api`,
  // baseURL: `http://65.1.3.134:3000/api`,

  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwNjkwNTY1MzJmMjU2OTQ3OWZjOWQiLCJpYXQiOjE2Nzg3OTc1ODMsImV4cCI6MTY4NjU3MzU4M30.8QjZtAmk342PMxa0CvGdqfp36BWk6lJ4QFyN6f1MO_A',
    // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDBjMzA5MDJjZGYzNjczYTI5YWU3MWQiLCJpYXQiOjE2NzkzOTM1NDksImV4cCI6MTY4NzE2OTU0OX0.doSWScAsJZyCJk62uM7rBbsS8ipkpLZ-FjuYrfYJmu8",
  },
});

export { axiosInstance };
