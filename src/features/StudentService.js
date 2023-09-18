import axios from "axios";
const API_URL = "http://localhost:8080/api/students";

const getAllStudents = async () => {
  const response = await axios.get(API_URL);

  console.log(response);
  return response.data;
};

export default {
  getAllStudents,
};
