import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";

import DeleteOneUser from "./DeleteOneUser";
import AddOneStudent from "./AddStudent";
import DisplayUser from "./DisplayUser";
import { getAllStudents, getSelectedStudent } from "../features/StudentSlice";
import StudentService from "../features/StudentService";

const DisplayAllUsers = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open1, setOpen1] = useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const [open3, setOpen3] = useState(false);
  const handleOpen3 = () => setOpen3(true);
  const handleClose3 = () => setOpen3(false);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [stID, setStID] = useState(0);

  useEffect(() => {
    dispatch(getAllStudents());
  }, []);

  const { allStudents, isLoading } = useSelector((state) => state.students);

  if (isLoading) {
    return (
      <>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );
  }
  return (
    <>
      <h1 style={{ textAlign: "center" }}>All Students</h1>
      <Box sx={{ marginLeft: "90%", marginBottom: 2 }}>
        <Button
          variant="contained"
          style={{ alignItems: "center" }}
          onClick={handleOpen2}
        >
          Add Student
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name&nbsp;</TableCell>
              <TableCell align="center">Age&nbsp;</TableCell>
              <TableCell align="center">Address&nbsp;</TableCell>
              <TableCell align="center">Actions&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allStudents.map((student, index) => (
              <TableRow key={index + 1}>
                <TableCell align="center">{student.name}</TableCell>
                <TableCell align="center">{student.age}</TableCell>
                <TableCell align="center">{student.address}</TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="View"
                    color="success"
                    title="Suspend"
                    onClick={() => {
                      handleOpen3();
                      dispatch(getSelectedStudent(student));
                    }}
                  >
                    <VisibilityIcon />
                  </IconButton>

                  <IconButton
                    aria-label="Delete"
                    color="error"
                    title="Suspend"
                    onClick={() => {
                      handleOpen1();
                      dispatch(getSelectedStudent(student));
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>

                  <DeleteOneUser open={open1} handleClose={handleClose1} />

                  <DisplayUser handleClose={handleClose3} open={open3} />

                  <AddOneStudent open={open2} handleClose={handleClose2} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DisplayAllUsers;
