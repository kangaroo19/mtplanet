import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function LoginSnackbar({openSnackbar}) {
  const [open, setOpen] = React.useState(true);

  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          로그인이 성공적으로 처리되었습니다!
        </Alert>
      </Snackbar>
      
    </Stack>
  );
}

export default React.memo(LoginSnackbar)