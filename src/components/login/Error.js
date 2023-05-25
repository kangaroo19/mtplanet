//로그인 화면에서 에러메시지 컴포넌트
import React, { useState,useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
function Error({error,callBack}){
  const navigate=useNavigate()
  const [newOpen,setNewOpen]=useState(true)
  
  const handleClose = () => {
    navigate('/login')
    setNewOpen(false)
  };

  useEffect(()=>{ //부모 컴포넌트로 값 보냄,이렇게 부모로 값을 보내지 않으면 newOpen값이 true로 고정되어 다음번 클릭때는 에러창 나타나지 않음
    callBack(newOpen)
  },[newOpen])
  
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