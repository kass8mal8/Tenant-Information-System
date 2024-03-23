import { Box, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import logo from "../../assets/images/logo.png"
import { useNavigate } from "react-router-dom"

const SideNav = () => {
    const navigate = useNavigate()
    return (  
        <Box className='sidenav' sx={{ width:'25%' }}>
            <img src={logo} width='150px' alt="logo" className="logo" />

            <List>
                <ListItem>
                    <ListItemText primary="Dashboard" onClick={() => navigate('/')}/>
                </ListItem>
                <Divider />
                <ListItem onClick={() => navigate('/tenants')}>
                    <ListItemText primary="Tenants" />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Property" onClick={() => navigate('/house')} />
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary="Financials" onClick={() => navigate('/finance')} />
                </ListItem>
            </List>

            <Typography 
                variant='body2' 
                color='text.secondary'
                sx={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '20px',
                    cursor: 'pointer'
                }}
                onClick={() => navigate('/signin')}
            >signout</Typography>
        </Box>
    );
}
 
export default SideNav;