import axios from "axios";
const API_URL = "http://localhost:8082/api/students";

const getAllStudents = async (getObj) => {
  const response = await axios.get(
    API_URL + "?page=" + getObj.page + "&limit=" + getObj.limit
  );
  return response.data;
};

const addAStudent = async (student) => {
  const response = await axios.post(API_URL, {
    name: student.name,
    age: student.age,
    address: student.address,
  });

  return response;
};

const updateStudentDetail = async (student, id) => {
  const response = await axios.patch(API_URL + `/${id}`, student);

  return response;
};

const deleteStudent = async (id) => {
  const response = await axios.delete(API_URL + `/${id}`);

  return response;
};

export default {
  getAllStudents,
  addAStudent,
  updateStudentDetail,
  deleteStudent,
};
