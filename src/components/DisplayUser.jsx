import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button, TextField, Typography } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { updateStudentDetail } from "../features/StudentSlice";

export default function DisplayUser({ open, handleClose }) {
  const { selectedStudent } = useSelector((state) => state.students);

  if (selectedStudent === null) {
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

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(selectedStudent).length > 0) {
      setName(selectedStudent.name);
      setAge(selectedStudent.age);
      setAddress(selectedStudent.address);
    }
  }, [selectedStudent]);

  const newValue = {
    name: name,
    age: age,
    address: address,
  };

  const pack = {
    student: newValue,
    id: selectedStudent.studentId,
  };

  let isFull = false;

  if (name === "" || age === 0 || address === "") {
    isFull = false;
  } else {
    isFull = true;
  }

  let updateStudent = null;

  updateStudent = () => {
    dispatch(updateStudentDetail(pack));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Student Details"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <form>
            <TextField
              id="outlined-basic"
              label="Enter Name"
              variant="outlined"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ margin: 5 }}
            />
            <TextField
              id="outlined-basic"
              label="Enter Age"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              variant="outlined"
              style={{ margin: 5 }}
            />
            <TextField
              id="outlined-basic"
              label="Enter Address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              variant="outlined"
              style={{ margin: 5 }}
            />
          </form>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">
          Cancel
        </Button>
        <Button
          onClick={() => {
            console.log(isFull);
            updateStudent();
            handleClose();
          }}
          autoFocus
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
