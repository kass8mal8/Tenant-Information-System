import { Box, Skeleton, Stack } from '@mui/material'

const MuiSkeleton = () => {
    return ( 
        <Stack spacing={1} sx={{ height: '200px', border: '1px solid red' }}>
            
            <Stack direction='row' spacing={2}>
                <Skeleton variant='text' animation='wave' width='100%' />
                <Skeleton variant='text' width='70%' animation='wave'   />
                <Skeleton variant='text' width='30%' animation='wave' />
                
                {/* <Skeleton variant='text' width='30px' height='30px' /> */}
            </Stack>

            
        </Stack>
     );
}
 
export default MuiSkeleton;