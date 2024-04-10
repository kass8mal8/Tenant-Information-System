import { Snackbar, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { forwardRef } from 'react';

const Alert = forwardRef((props, ref) => {
  return <MuiAlert ref={ref} {...props} />;
});

const Toast = ({ data, open, handleClose, error }) => {
  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'top', horizontal: 'middle' }}
    >
      <Alert severity={error ? 'error' : 'success'}>
        <Typography> {data ? data : error} </Typography>
      </Alert>
    </Snackbar>
  );
};

export default Toast;
