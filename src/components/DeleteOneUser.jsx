import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { deleteSelectedStudent, deleteStudent } from "../features/StudentSlice";
import { useState } from "react";
import { useEffect } from "react";

export default function DeleteOneUser({ open, handleClose }) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

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

  useEffect(() => {
    if (Object.keys(selectedStudent).length > 0) {
      setName(selectedStudent.name);
    }
  }, [selectedStudent]);

  const deleteStudentFunc = (id) => {
    dispatch(deleteStudent(id))
      .unwrap()
      .then(() => {
        dispatch(deleteSelectedStudent(id));
      });
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
          {`Are you sure want to Remove ${name}?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action can not be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button
            onClick={() => {
              deleteStudentFunc(selectedStudent.studentId);
              handleClose();
            }}
            autoFocus
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
