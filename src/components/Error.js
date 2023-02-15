//로그인 화면에서 에러메시지 컴포넌트
import React, { useState,useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function Error({error,callBack}){
  const [newOpen,setNewOpen]=useState(true)
  const handleClose = () => {
    setNewOpen(false)
  };
  useEffect(()=>{ //부모 컴포넌트로 값 보냄
    callBack(newOpen)
  })
    return (
        <Dialog
        open={newOpen}
        keepMounted
        // onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"오류 발생"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {error}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>닫기</Button>
        </DialogActions>
      </Dialog>
    )
}

export default Error