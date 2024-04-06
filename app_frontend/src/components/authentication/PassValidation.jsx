import { Box, IconButton, Stack, Typography } from "@mui/material";
import { CheckOutlined, Cancel } from "@mui/icons-material";

const PassValidation = ({ requirement, isError, isLengthError }) => {
    return (  
        <Box>
            <Stack direction='row' spacing={1} alignItems='center'>
                <IconButton>
                    {isLengthError ? <Cancel sx={{ width: '16px', height: '16px' }} /> 
                    :<CheckOutlined sx={{ width: '16px', height: '16px', color: !isLengthError && 'green'}} />
                    }
                </IconButton>
                <Typography variant='body2' sx={{ fontSize: '10pt', color: !isLengthError && 'green' }}>
                    {requirement.length}
                </Typography>
            </Stack> 
            <Stack direction='row' spacing={1} alignItems='center'>
                <IconButton>
                {isError ? <Cancel sx={{ width: '16px', height: '16px'}} />
                : <CheckOutlined sx={{ width: '16px', height: '16px', color: !isError &&'green'}} />}
                </IconButton>
                <Typography variant='body2' sx={{ fontSize: '10pt', color: !isError &&'green' }}>
                    { requirement.special} 
                </Typography>
            </Stack> 
        </Box>
    );
}
 
export default PassValidation;