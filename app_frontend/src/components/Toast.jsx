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
      autoHideDuration={2000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert severity={'error'}>
        <Typography> {data ? data : error} </Typography>
      </Alert>
    </Snackbar>
  );
};

export default Toast;
