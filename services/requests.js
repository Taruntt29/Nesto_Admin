import { axiosInstance, axiosInstanceWithoutFormData } from "./api";
// ?.post(endPoint, body, { timeout: 40000 })

const postAPI = (endPoint, body) =>
  axiosInstance
    ?.post(endPoint, body, { timeout: 40000 })
    .then((response) => {
      console.log(`body of ${endPoint} ${body}`);
      console.log("response of ", endPoint, "-->>", response);
      return response.data;
    })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response && error.response.data) {
        // console.log(error.response.data); // log the error response from the API
      } else {
        console.log(error); // log the error if there is no response property on the error object
      }
      throw error;
    });

const postAPIWithoutFormData = (endPoint, body) =>
  axiosInstanceWithoutFormData
    ?.post(endPoint, body, { timeout: 40000 })
    .then((response) => {
      console.log(`body of ${endPoint} ${body}`);
      console.log("response of ", endPoint, "-->>", response);
      return response.data;
    })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response && error.response.data) {
        // console.log(error.response.data); // log the error response from the API
      } else {
        console.log(error); // log the error if there is no response property on the error object
      }
      throw error;
    });

const getAPI = (endPoint, body) =>
  axiosInstance
    ?.get(endPoint, body, { timeout: 40000 })
    .then((response) => {
      console.log(`body of ${endPoint} ${body}`);
      console.log("response of ", endPoint, "-->>", response);
      return response.data;
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

const putAPI = (endPoint, body) =>
  axiosInstance
    ?.put(endPoint, body)
    .then((response) => {
      console.log(`body of ${endPoint} ${body}`);
      console.log("response of ", endPoint, "-->>", response);
      return response.data;
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

const deleteAPI = (endPoint) =>
  axiosInstance
    ?.delete(endPoint)
    .then((response) => {
      console.log(`body of ${endPoint} `);
      console.log("response of ", endPoint, "-->>", response);
      return response.data;
    })
    .catch((error) => {
      throw error;
    });

export { getAPI, postAPI, postAPIWithoutFormData, putAPI, deleteAPI };
