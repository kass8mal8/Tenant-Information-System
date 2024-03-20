import { Outlet, useLocation } from 'react-router-dom';
import { useState } from "react";
import { 
    Box, 
} from '@mui/material';
import MuiSkeleton from './MuiSkeleton';


const Home = () => {
    const location = useLocation()
    
    return (  
        <Box sx={{ position: 'absolute', marginLeft: '27%', marginTop: '-47%', width: '71%', alignItems: 'center' }}>
            <Outlet />
            {/* <MuiSkeleton /> */}
            {/* Hello World */}
        </Box>
    );
}
 
export default Home;