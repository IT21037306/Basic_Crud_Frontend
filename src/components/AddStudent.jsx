import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import axios from "axios";
import { useState } from "react";

export default function AddOneStudent({ open, handleClose }) {
  const navigate = useNavigate;

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [address, setAddress] = useState("");

  const student = {
    name: name,
    age: age,
    address: address,
  };

  const addStudent = async () => {
    await axios.post(`http://localhost:8080/api/students`, student);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Create A New Student"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
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
              addStudent();
              handleClose();
            }}
            autoFocus
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
