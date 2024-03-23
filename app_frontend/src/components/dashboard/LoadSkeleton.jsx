import { Skeleton, Stack } from "@mui/material";

const LoadSkeleton = () => {
    return (  
        <Stack direction='row' spacing={2} justifyContent='space-between'>
            <Skeleton variant='text' height='40px' width='60%' />
            <Skeleton variant='text' height='40px' width='40%' />
        </Stack>
    );
}
 
export default LoadSkeleton;