import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

import { useDispatch } from "react-redux";
import axios from "axios";
import { useState } from "react";

export default function DisplayOneUser({ open, handleClose, student }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [address, setAddress] = useState("");

  const InitialValue = {
    name: student.name,
    age: student.age,
    address: student.address,
  };

  return (
    <div>
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
                value={InitialValue.name}
                onChange={(e) => setName(e.target.value)}
                style={{ margin: 5 }}
              />
              <TextField
                id="outlined-basic"
                label="Enter Age"
                name="age"
                value={InitialValue.age}
                onChange={(e) => setAge(e.target.value)}
                variant="outlined"
                style={{ margin: 5 }}
              />
              <TextField
                id="outlined-basic"
                label="Enter Address"
                name="address"
                value={InitialValue.address}
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
              handleClose();
            }}
            autoFocus
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
