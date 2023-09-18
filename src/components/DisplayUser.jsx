import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Button, TextField, Typography } from "@mui/material";

import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function DisplayUser({ open, handleClose, student }) {
  if (student != null) {
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [address, setAddress] = useState("");

    const newValue = {
      name: name,
      age: age,
      address: address,
    };

    const updateStudent = async () => {
      await axios.put(
        `http://localhost:8080/api/students/${student.studentId}`,
        newValue
      );
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
            <Box>
              <Typography variant="h5">Name : {student.name}</Typography>
              <Typography variant="h5">Age : {student.age}</Typography>
              <Typography variant="h5">Address : {student.address}</Typography>
            </Box>

            <form>
              <TextField
                id="outlined-basic"
                label="Enter Name"
                variant="outlined"
                name="name"
                onChange={(e) => setName(e.target.value)}
                style={{ margin: 5 }}
              />
              <TextField
                id="outlined-basic"
                label="Enter Age"
                name="age"
                onChange={(e) => setAge(e.target.value)}
                variant="outlined"
                style={{ margin: 5 }}
              />
              <TextField
                id="outlined-basic"
                label="Enter Address"
                name="address"
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
}
